"use client"
import { Box } from "@mui/material"
import Grid from "@mui/material/Grid";
import {generateTagsDisplay} from "@/components/shared/TagComponents";
import {TagsFormat} from "@/mocks/Tags";

export type EventBannerProps = {
    attendees: number,
    numGames: number,
    title: string,
    eventTag: TagsFormat,
    bannerUrl: {
        desktop: string,
        mobile?: string,
    },
    links: { url: string, text:string }[],
    bannerColor?: string,
}
export default function EventBanner({bannerUrl, links, bannerColor, title, eventTag, attendees, numGames} : EventBannerProps) {
    const backgroundColor = bannerColor || "linear-gradient(135deg, rgba(25,118,210,0.8), rgba(25,118,210,1))";
    return (
        <Grid
            sx={{
                background: backgroundColor,
                paddingTop:"8px",
            }}
        >
            <Grid>
                {/* BANNER */}
                <Box
                    component="img"
                    src={bannerUrl.desktop}
                    alt={title}
                    sx={{
                        display: "block",
                        width: "100%",
                        height: "auto",
                        maxHeight:"250px",
                        objectFit: "contain",
                        alignSelf:"center",
                        justifySelf:"center",
                    }}
                />

                <Grid
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    paddingTop="3px"
                    paddingBottom="3px"
                    sx={{gap: 1.5}}
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
                            alignItems:"center",
                            justifyContent:"center"
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
                            alignItems:"center",
                            justifyContent:"center"
                        }}

                    >
                        {`${numGames} tables`}
                    </Box>

                    {generateTagsDisplay(eventTag)}
                    {links.map( (link) =>
                        generateLink(link))}
                </Grid>
            </Grid>
        </Grid>
    )
}

const generateLink = function (link: { url: string, text:string }) {
    return (
        <Box
            component="a"
            href={link.url}
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
                alignItems:"center",
                justifyContent:"center",
            }}

        >
            {link.text}
        </Box>
    )
}