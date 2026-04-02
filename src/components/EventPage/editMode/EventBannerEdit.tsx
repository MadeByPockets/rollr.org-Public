"use client"
import React, { useState } from "react";
import { useEventEdit } from "./EventEditContext";
import type { EventBannerEditPayload } from "../EventBanner";
import { 
    Box, 
    Button, 
    Grid, 
    TextField, 
    IconButton, 
    Tooltip, 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions,
    CircularProgress 
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import ColorizeIcon from "@mui/icons-material/Colorize";
import { generateTagsDisplay } from "@/components/shared/TagComponents";

type EventBannerEditProps = {
    initialValue: EventBannerEditPayload;
    onCancel: () => void;
    onSave: (payload: Partial<EventBannerEditPayload>) => Promise<void> | void;
};

type LinkEditState = {
    index: number;
    text: string;
    url: string;
} | null;

export default function EventBannerEdit({
                                            initialValue,
                                            onCancel,
                                            onSave,
                                        }: EventBannerEditProps) {
    const { updateImages } = useEventEdit();
    const [title, setTitle] = useState(initialValue.title);
    const [bannerColor, setBannerColor] = useState(initialValue.bannerColor || "");
    const [desktopBanner, setDesktopBanner] = useState(initialValue.bannerUrl.desktop);
    const [mobileBanner, setMobileBanner] = useState(initialValue.bannerUrl.mobile || "");
    const [links, setLinks] = useState(initialValue.links);
    const [linkToEdit, setLinkToEdit] = useState<LinkEditState>(null);
    const [isSaving, setIsSaving] = useState(false);

    const backgroundColor = bannerColor || "linear-gradient(135deg, rgba(25,118,210,0.8), rgba(25,118,210,1))";

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const patch: Partial<EventBannerEditPayload> = {};

            if (title !== initialValue.title) {
                patch.title = title;
            }

            const currentBannerColor = bannerColor || undefined;
            const initialBannerColor = initialValue.bannerColor || undefined;
            if (currentBannerColor !== initialBannerColor) {
                patch.bannerColor = currentBannerColor;
            }

            const currentMobile = mobileBanner || undefined;
            const initialMobile = initialValue.bannerUrl.mobile || undefined;
            if (desktopBanner !== initialValue.bannerUrl.desktop || currentMobile !== initialMobile) {
                patch.bannerUrl = {
                    desktop: desktopBanner,
                    mobile: currentMobile,
                };
            }

            // Deep comparison for links
            if (JSON.stringify(links) !== JSON.stringify(initialValue.links)) {
                patch.links = links;
            }

            if (Object.keys(patch).length > 0) {
                await onSave(patch);
            } else {
                onCancel(); // Nothing changed
            }
        } catch (error) {
            console.error("Failed to save banner changes", error);
        } finally {
            setIsSaving(false);
        }
    };

    const removeLink = (index: number) => {
        setLinks(links.filter((_, i) => i !== index));
    };

    const openEditLink = (index: number) => {
        setLinkToEdit({
            index,
            text: links[index].text,
            url: links[index].url
        });
    };

    const saveEditedLink = () => {
        if (linkToEdit) {
            const newLinks = [...links];
            if (linkToEdit.index === -1) {
                newLinks.push({ text: linkToEdit.text, url: linkToEdit.url });
            } else {
                newLinks[linkToEdit.index] = { text: linkToEdit.text, url: linkToEdit.url };
            }
            setLinks(newLinks);
            setLinkToEdit(null);
        }
    };

    const handleEyeDropper = async () => {
        if (!(window as any).EyeDropper) {
            alert("EyeDropper API is not supported in this browser");
            return;
        }
        const eyeDropper = new (window as any).EyeDropper();
        try {
            const result = await eyeDropper.open();
            setBannerColor(result.sRGBHex);
        } catch (e) {
            console.log("EyeDropper cancelled or failed", e);
        }
    };

    return (
        <Box sx={{ position: 'relative', width: '100%' }}>
            <Grid
                sx={{
                    background: backgroundColor,
                    paddingTop: "8px",
                    position: 'relative',
                    border: '2px dashed rgba(255,255,255,0.5)',
                    borderRadius: 1
                }}
            >
                {/* SETTINGS OVERLAY */}
                <Box sx={{ 
                    position: 'absolute', 
                    top: 8, 
                    left: 8, 
                    zIndex: 10, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 1,
                    bgcolor: 'rgba(0,0,0,0.5)',
                    p: 1,
                    borderRadius: 1,
                    width: '300px'
                }}>
                    <TextField
                        label="Title"
                        variant="outlined"
                        size="small"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        sx={{ input: { color: 'white' }, label: { color: 'rgba(255,255,255,0.7)' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' } } }}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <TextField
                            label="Banner Color"
                            variant="outlined"
                            size="small"
                            value={bannerColor}
                            onChange={(e) => setBannerColor(e.target.value)}
                            placeholder="#HEX or linear-gradient(...)"
                            sx={{ flex: 1, input: { color: 'white' }, label: { color: 'rgba(255,255,255,0.7)' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' } } }}
                        />
                        <Tooltip title="Eye Dropper">
                            <IconButton 
                                size="small" 
                                onClick={handleEyeDropper}
                                sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)', '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}
                            >
                                <ColorizeIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <input
                            type="color"
                            value={bannerColor.startsWith('#') ? bannerColor : '#1976d2'}
                            onChange={(e) => setBannerColor(e.target.value)}
                            style={{ width: '40px', height: '40px', padding: 0, border: 'none', background: 'transparent', cursor: 'pointer' }}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button 
                            variant="contained" 
                            size="small" 
                            fullWidth 
                            onClick={updateImages}
                        >
                            Update Images
                        </Button>
                    </Box>
                </Box>

                {/* VISUAL PREVIEW */}
                <Box
                    sx={{
                        width: '100%',
                        height: 'auto',
                        maxHeight: '250px',
                        overflow: 'hidden',
                        display: 'flex',
                        justifyContent: 'center',
                        opacity: 0.8
                    }}
                >
                    <Box
                        component="img"
                        src={desktopBanner}
                        alt={title}
                        sx={{
                            width: '100%',
                            height: 'auto',
                            objectFit: 'contain',
                        }}
                    />
                </Box>

                <Grid
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    paddingTop="3px"
                    paddingBottom="3px"
                    sx={{ gap: 1.5, flexWrap: 'wrap' }}
                >
                    {/* Placeholder for Stats (not editable here as per instructions) */}
                    <Box sx={{ px: 1.5, py: 0.5, color: "rgba(255,255,255,0.5)", bgcolor: "rgba(0,0,0,0.4)", borderRadius: 2, border: "1px dashed rgba(255,255,255,0.2)" }}>
                        Stats Placeholder
                    </Box>

                    {generateTagsDisplay(initialValue.eventTag)}

                    {links.map((link, index) => (
                        <Box
                            key={index}
                            sx={{
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                px: 1.5,
                                py: 0.5,
                                color: "#fff",
                                bgcolor: "rgba(0,0,0,0.7)",
                                borderRadius: 2,
                                boxShadow: "0 8px 16px rgba(0,0,0,0.25), 0 2px 4px rgba(0,0,0,0.15)",
                                border: "1px solid rgba(255,255,255,0.25)",
                                backdropFilter: "blur(6px)",
                                fontWeight: 700,
                                letterSpacing: 0.2,
                            }}
                        >
                            {link.text}
                            <Box sx={{ ml: 1, display: 'flex' }}>
                                <Tooltip title="Edit Link">
                                    <IconButton size="small" onClick={() => openEditLink(index)} sx={{ color: 'white', p: 0.2 }}>
                                        <EditIcon fontSize="inherit" />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Remove Link">
                                    <IconButton size="small" onClick={() => removeLink(index)} sx={{ color: 'error.light', p: 0.2 }}>
                                        <DeleteIcon fontSize="inherit" />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Box>
                    ))}

                    <Button
                        variant="outlined"
                        size="small"
                        startIcon={<AddIcon />}
                        onClick={() => setLinkToEdit({ index: -1, text: "", url: "" })}
                        sx={{
                            color: 'white',
                            borderColor: 'rgba(255,255,255,0.5)',
                            borderRadius: 2,
                            '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' }
                        }}
                    >
                        Add Link
                    </Button>
                </Grid>
            </Grid>

            {/* ACTION BUTTONS */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                <Button onClick={onCancel} color="inherit" disabled={isSaving}>Cancel</Button>
                <Button 
                    onClick={handleSave} 
                    variant="contained" 
                    color="primary" 
                    disabled={isSaving}
                    startIcon={isSaving ? <CircularProgress size={20} color="inherit" /> : null}
                >
                    {isSaving ? "Saving..." : "Save Changes"}
                </Button>
            </Box>

            {/* LINK EDIT DIALOG */}
            <Dialog open={linkToEdit !== null} onClose={() => setLinkToEdit(null)}>
                <DialogTitle>{linkToEdit?.index === -1 ? "Add Link" : "Edit Link"}</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1, width: '400px' }}>
                        <TextField
                            label="Link Text"
                            fullWidth
                            value={linkToEdit?.text || ""}
                            onChange={(e) => setLinkToEdit(prev => prev ? { ...prev, text: e.target.value } : null)}
                        />
                        <TextField
                            label="Link URL"
                            fullWidth
                            value={linkToEdit?.url || ""}
                            onChange={(e) => setLinkToEdit(prev => prev ? { ...prev, url: e.target.value } : null)}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setLinkToEdit(null)}>Cancel</Button>
                    <Button onClick={saveEditedLink} variant="contained">Confirm</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}