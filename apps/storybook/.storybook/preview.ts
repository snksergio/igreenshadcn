import type { Preview } from "@storybook/react";
import '@igreen/themes/dist/igreen.css'; // Import themes
import '@igreen/themes/dist/bridge.css'; // Import bridge for shadcn

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
};

export default preview;
