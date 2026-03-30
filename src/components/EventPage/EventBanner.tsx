import { useState } from "react";
import { useEventEdit } from "./editMode/EventEditContext";
import type { EventDB } from "../../types/event";
import EventBannerEdit from "./editMode/EventBannerEdit";
import { generateTagsDisplay } from "@/components/shared/TagComponents";
import { Box, Button } from "@mui/material";
import Grid from "@mui/material/Grid";

export type EventBannerProps = {
    bannerUrl: EventDB["bannerUrl"];
    links: EventDB["links"];
    title: EventDB["title"];
    eventTag: EventDB["eventTag"];
    attendees: number;
    numGames: number;
    bannerColor?: string;
};

export type EventBannerEditPayload = {
    bannerUrl: EventDB["bannerUrl"];
    bannerColor?: EventDB["bannerColor"];
    links: EventDB["links"];
    title: EventDB["title"];
    eventTag: EventDB["eventTag"];
};

export default function EventBanner(props: EventBannerProps) {
    const { isOwner, updateEvent } = useEventEdit();
    const [isEditing, setIsEditing] = useState(false);

    if (isEditing) {
        return (
            <EventBannerEdit
                initialValue={{
                    bannerUrl: props.bannerUrl,
                    bannerColor: props.bannerColor,
                    links: props.links,
                    title: props.title,
                    eventTag: props.eventTag,
                }}
                onCancel={() => setIsEditing(false)}
                onSave={(payload) => {
                    updateEvent(payload);
                    setIsEditing(false);
                }}
            />
        );
    }

    return (
        <EventBannerView
            {...props}
            isOwner={isOwner}
            onEdit={() => setIsEditing(true)}
        />
    );
}

type EventBannerViewProps = EventBannerProps & {
    isOwner: boolean;
    onEdit: () => void;
};

function EventBannerView({
                             bannerUrl,
                             links,
                             bannerColor,
                             title,
                             eventTag,
                             attendees,
                             numGames,
                             isOwner,
                             onEdit,
                         }: EventBannerViewProps) {
    const backgroundColor = bannerColor || "linear-gradient(135deg, rgba(25,118,210,0.8), rgba(25,118,210,1))";
    return (
        <Grid
            sx={{
                background: backgroundColor,
                paddingTop: "8px",
                position: 'relative'
            }}
        >
            <Grid>
                {/* BANNER */}
                <Box
                    sx={{
                        width: '100%',
                        height: 'auto',
                        maxHeight: '250px',
                        overflow: 'hidden',
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <Box
                        component="img"
                        src={bannerUrl.desktop}
                        alt={title}
                        sx={{
                            width: '100%',
                            height: 'auto',
                            objectFit: 'contain',
                            display: { xs: 'none', md: 'block' }
                        }}
                    />
                    {bannerUrl.mobile && (
                        <Box
                            component="img"
                            src={bannerUrl.mobile}
                            alt={title}
                            sx={{
                                width: '100%',
                                height: 'auto',
                                objectFit: 'contain',
                                display: { xs: 'block', md: 'none' }
                            }}
                        />
                    )}
                    {!bannerUrl.mobile && (
                        <Box
                            component="img"
                            src={bannerUrl.desktop}
                            alt={title}
                            sx={{
                                width: '100%',
                                height: 'auto',
                                objectFit: 'contain',
                                display: { xs: 'block', md: 'none' }
                            }}
                        />
                    )}
                </Box>

                <Grid
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    paddingTop="3px"
                    paddingBottom="3px"
                    sx={{ gap: 1.5, flexWrap: 'wrap' }}
                >
                    <Box
                        sx={{
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
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        {`${attendees} Players`}
                    </Box>

                    <Box
                        sx={{
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
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        {`${numGames} tables`}
                    </Box>

                    {generateTagsDisplay(eventTag)}
                    {links.map((link) => generateLink(link))}
                </Grid>
            </Grid>

            {isOwner && (
                <Button
                    variant="contained"
                    onClick={onEdit}
                    sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        bgcolor: 'rgba(255, 255, 255, 0.9)',
                        color: 'primary.main',
                        '&:hover': {
                            bgcolor: 'white',
                        }
                    }}
                >
                    Edit
                </Button>
            )}
        </Grid>
    )
}

const generateLink = function (link: { url: string, text: string }) {
    return (
        <Box
            component="a"
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            key={link.text}
            sx={{
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
                alignItems: "center",
                justifyContent: "center",
                textDecoration: 'none',
                '&:hover': {
                    bgcolor: "rgba(255,255,255,0.1)",
                }
            }}
        >
            {link.text}
        </Box>
    )
}