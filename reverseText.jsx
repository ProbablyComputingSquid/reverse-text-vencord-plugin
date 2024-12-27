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
                    const reversedText = message.content.split("").reverse().join("");
                    updateMessage(message.channel_id, message.id, { content: reversedText });
                }
            };
        });
        },
    stop() {
        removePreSendListener(this.preSend);
    },
    transformText(text: string) {
        const regex = /(:\w+:|<@\d+>|<@!\d+>)/g;
        const parts = text.split(regex);

        const reversedParts = parts.map(part => {
            if (regex.test(part)) {
                return part;
            }
            return part.split("").reverse().join("");
        });

        return reversedParts.join("");
    }
});
