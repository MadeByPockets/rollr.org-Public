import {Tags, TagsFormat} from "@/mocks/Tags";

export interface EventDB {
    id: number;
    title: string;
    bannerUrl: {
        desktop: string,
        mobile?: string,
    };
    links: { url: string, text: string }[]
    description: string;
    date: string;
    location?: string;
    organizer?: string;
    eventTag: TagsFormat
    tags?: number[];
    imageUrl?: string;
    startingDate?: Date,
    endingDate?: Date,
}

export const eventObjects : EventDB[] = [
    {
        id: 1,
        title: "Youmacon 2025",
        eventTag: Tags[12],
        bannerUrl: {
            desktop: "/youmacon.png",
            mobile: "/youmacon.png",
        },
        links: [
            {
                url: "https://www.youmacon.com",
                text: "Home",
            },
            {
                url:"https://discord.gg/PKW99btT",
                text:"Discord",
            }
        ],
        description: "Youmacon is a 4-day experience celebrating Japanese Animation, Gaming, and Pop Culture. Whether you’re a convention pro, or have yet to attend an Anime event, we have what you’re looking for. Since 2005, Youmacon has been an immersive and innovative event unlike any other. Get your tickets today.\n" +
            "\n" +
            "Take a quick tour to see what we have in store for you!\n" +
            "\n" +
            "Event times coming soon!",
        date: "Main Convention:\n\tThu - 5pm to 9pm\n\tFri & Sat - 10am to 9pm\n\tSun 10am to 2pm\nGaming Room Hours:\n\tThu - 6pm to 10pm\n\tFri & Sat - 10am to 1am\n\tSun - 10am to 4pm",
        startingDate: new Date(2025, 9, 30, 10),
        endingDate: new Date(2025, 10, 2, 7)
    }
]