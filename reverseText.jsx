/*
 * Vencord, a Discord client mod
 * Copyright (c) 2023 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

// Needed header for all plugins

import { addPreSendListener, removePreSendListener } from "@api/MessageEvents";
import { addButton } from "@api/MessagePopover";
import { updateMessage } from "@api/MessageUpdater";
import { definePluginSettings } from "@api/Settings";
import { ImageVisible } from "@components/Icons";
import definePlugin from "@utils/types";
import { ChannelStore } from "@webpack/common";

const pluginSettings = definePluginSettings({});

export default definePlugin({
    name: "Reverse Text",
    description: "Reverses all of your text",
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
        addButton("Reverse Text", message => {
            return {
                label: "reversed text",
                icon: ImageVisible,
                message: message,
                channel: ChannelStore.getChannel(message.channel_id),
                onClick: async () => {
                    const reversedText = this.transformText(message.content);
                    updateMessage(message.channel_id, message.id, { content: reversedText });
                }
            };
        });
        },
    stop() {
        removePreSendListener(this.preSend);
    },
    transformText(text: string) {
        const regex = /(:\w+:|<@\d+>|<@!\d+>|https?:\/\/\S+|\[[^\]]+\]\([^)]+\)|[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{2B50}\u{2B55}\u{2934}\u{2935}\u{3030}\u{3297}\u{3299}])/gu;
        const parts = text.split(regex);

        const reversedParts = parts.reverse().map(part => {
            if (regex.test(part)) {
                return part;
            }
            return part.split("").reverse().join("");
        });

        return reversedParts.join("");
    }
});
