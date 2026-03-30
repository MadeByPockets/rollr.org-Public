"use client"
import React, { useState } from "react";
import type { EventBannerEditPayload } from "../EventBanner";

type EventBannerEditProps = {
    initialValue: EventBannerEditPayload;
    onCancel: () => void;
    onSave: (payload: EventBannerEditPayload) => void;
};

export default function EventBannerEdit({
                                            initialValue,
                                            onCancel,
                                            onSave,
                                        }: EventBannerEditProps) {
    const [title, setTitle] = useState(initialValue.title);
    const [bannerColor, setBannerColor] = useState(initialValue.bannerColor || "");
    const [desktopBanner, setDesktopBanner] = useState(initialValue.bannerUrl.desktop);
    const [mobileBanner, setMobileBanner] = useState(initialValue.bannerUrl.mobile || "");
    const [links, setLinks] = useState(initialValue.links);

    const handleLinkChange = (index: number, field: "url" | "text", value: string) => {
        const newLinks = [...links];
        newLinks[index] = { ...newLinks[index], [field]: value };
        setLinks(newLinks);
    };

    const addLink = () => {
        setLinks([...links, { url: "", text: "" }]);
    };

    const removeLink = (index: number) => {
        setLinks(links.filter((_, i) => i !== index));
    };

    const handleSave = () => {
        onSave({
            title,
            bannerColor: bannerColor || undefined,
            bannerUrl: {
                desktop: desktopBanner,
                mobile: mobileBanner || undefined,
            },
            links,
            eventTag: initialValue.eventTag, // In a full impl, we'd have a tag selector
        });
    };

    return (
        <div style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}>
            <h3>Edit Event Banner</h3>
            
            <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block" }}>Title</label>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{ width: "100%" }}
                />
            </div>

            <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block" }}>Banner Background (Color or Gradient)</label>
                <input
                    value={bannerColor}
                    onChange={(e) => setBannerColor(e.target.value)}
                    placeholder="e.g. #1976d2 or linear-gradient(...)"
                    style={{ width: "100%" }}
                />
            </div>

            <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block" }}>Desktop Banner URL</label>
                <input
                    value={desktopBanner}
                    onChange={(e) => setDesktopBanner(e.target.value)}
                    style={{ width: "100%" }}
                />
            </div>

            <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block" }}>Mobile Banner URL (optional)</label>
                <input
                    value={mobileBanner}
                    onChange={(e) => setMobileBanner(e.target.value)}
                    style={{ width: "100%" }}
                />
            </div>

            <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block" }}>Links</label>
                {links.map((link, index) => (
                    <div key={index} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
                        <input
                            placeholder="Text"
                            value={link.text}
                            onChange={(e) => handleLinkChange(index, "text", e.target.value)}
                        />
                        <input
                            placeholder="URL"
                            value={link.url}
                            onChange={(e) => handleLinkChange(index, "url", e.target.value)}
                        />
                        <button type="button" onClick={() => removeLink(index)}>Remove</button>
                    </div>
                ))}
                <button type="button" onClick={addLink}>Add Link</button>
            </div>

            <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                <button type="button" onClick={onCancel}>Cancel</button>
                <button type="button" onClick={handleSave} style={{ fontWeight: "bold" }}>Save Changes</button>
            </div>
        </div>
    );
}