/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

// Needed header for all plugins

import { addPreSendListener, removePreSendListener } from "@api/MessageEvents";
import { addButton } from "@api/MessagePopover";
import { updateMessage } from "@api/MessageUpdater";
import { definePluginSettings } from "@api/Settings";
import { classes } from "@utils/misc";
import definePlugin from "@utils/types";
import { ChannelStore } from "@webpack/common";
import type { PropsWithChildren } from "react";

interface BaseIconProps extends IconProps {
    viewBox: string;
}

const reverses = {
    "a": "ɐ",
    "b": "q",
    "c": "ɔ",
    "d": "p",
    "e": "ǝ",
    "f": "ɟ",
    "g": "ƃ",
    "h": "ɥ",
    "i": "ᴉ",
    "j": "ɾ",
    "k": "ʞ",
    "l": "l",
    "m": "ɯ",
    "n": "u",
    "o": "o",
    "p": "d",
    "q": "b",
    "r": "ɹ",
    "s": "s",
    "t": "ʇ",
    "u": "n",
    "v": "ʌ",
    "w": "ʍ",
    "x": "x",
    "y": "ʎ",
    "z": "z",
    "A": "∀",
    "B": "𐐒",
    "C": "Ɔ",
    "D": "◖",
    "E": "Ǝ",
    "F": "Ⅎ",
    "G": "⅁",
    "H": "H",
    "I": "I",
    "J": "ſ",
    "K": "⋊",
    "L": "⅃",
    "M": "W",
    "N": "N",
    "O": "O",
    "P": "Ԁ",
    "Q": "Ό",
    "R": "ᴚ",
    "S": "S",
    "T": "⊥",
    "U": "∩",
    "V": "Λ",
    "W": "M",
    "X": "X",
    "Y": "⅄",
    "Z": "Z",
    "0": "0",
    "1": "Ɩ",
    "2": "ᄅ",
    "3": "Ɛ",
    "4": "ㄣ",
    "5": "ϛ",
    "6": "9",
    "7": "ㄥ",
    "8": "8",
    "9": "6",
    "'": ",",
    ",": "'",
    ".": "˙",
    "!": "¡",
    "?": "¿",
    "(": ")",
    ")": "(",
    "[": "]",
    "]": "[",
    "{": "}",
    "}": "{",
    "<": ">",
    ">": "<",
    "_": "‾",
    "‾": "_",
    '"': "„",
    "„": '"',
    "&": "⅋",
    "⅋": "&",
};
const bidirectionalReverses = { ...reverses };
// @ts-ignore
for (const [key, value] of Object.entries(reverses)) {
    // @ts-ignore
    bidirectionalReverses[value] = key;
}
type IconProps = JSX.IntrinsicElements["svg"];
function Icon({ height = 24, width = 24, className, children, viewBox, ...svgProps }: PropsWithChildren<BaseIconProps>) {
    return (
        <svg
            role="img"
            width={width}
            height={height}
            viewBox={viewBox}
            {...svgProps}
        >
            {children}
        </svg>
    );
}


const pluginSettings = definePluginSettings({});


export function ReverseIcon (props: IconProps) {
    return (
        <Icon
            {...props}
            className={classes(props.className, "vc-mirror-icon")}
            viewBox="0 0 24 24"
        >
            <path opacity="0.5"
                  d="M4.35 17C3.49422 15.597 3 13.9413 3 12.168C3 7.10468 7.02944 3 12 3C16.9706 3 21 7.10468 21 12.168C21 13.9413 20.5058 15.597 19.65 17"
                  stroke="#1C274C" stroke-width="1.5"/>
            <path
                d="M5.63636 22H18.3636C20.3719 22 22 20.3719 22 18.3636C22 17.6105 21.3895 17 20.6364 17H16.8284C16.298 17 15.7893 17.2107 15.4142 17.5858L14.5858 18.4142C14.2107 18.7893 13.702 19 13.1716 19H10.8284C10.298 19 9.78929 18.7893 9.41421 18.4142L8.58579 17.5858C8.21071 17.2107 7.70201 17 7.17157 17H3.36364C2.61052 17 2 17.6105 2 18.3636C2 20.3719 3.62806 22 5.63636 22Z"
                stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
        </Icon>
    );
}

export default definePlugin({
    name: "Mirror Text",
    description: "Mirrors all of your text",
    authors: [
        {
            name: "computingsquid",
            id: 697889258215702588n,
        },
    ],
    settings: pluginSettings,
    async start() {
        this.preSend = addPreSendListener((_channelId, msg) => {
            msg.content = this.transformText(msg.content);
        });
        addButton("Mirror Text", message => {
            return {
                label: "Mirror text",
                icon: ReverseIcon,
                message: message,
                channel: ChannelStore.getChannel(message.channel_id),
                onClick: async () => {
                    const mirroredText = this.transformText(message.content);
                    updateMessage(message.channel_id, message.id, { content: mirroredText });
                }
            };
        });
    },
    stop() {
        removePreSendListener(this.preSend);
    },
    transformText(text: string) {
        // regex matches emojis, mentions, links, markdown links, and unicode emojis
        const regex = /(:\w+:|<@\d+>|<@!\d+>|https?:\/\/\S+|\[[^\]]+\]\([^)]+\)|[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{2B50}\u{2B55}\u{2934}\u{2935}\u{3030}\u{3297}\u{3299}])/gu;
        const parts = text.split(regex);

        const mirroredParts = parts.reverse().map(part => {
            if (regex.test(part)) {
                return part;
            }
            return part.split("").map((char: string | number) => bidirectionalReverses[char] || char).reverse().join("");
        });

        return mirroredParts.join("");
    }
});
