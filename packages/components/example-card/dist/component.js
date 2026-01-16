import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cardStyles } from './styles';
import { cn } from '@igreen/utils';
export const ExampleCard = ({ title, description, variant = 'default' }) => {
    return (_jsxs("div", { className: cn(cardStyles.container, cardStyles.variants[variant]), children: [_jsx("h3", { className: cardStyles.title, children: title }), _jsx("p", { className: cardStyles.description, children: description })] }));
};
//# sourceMappingURL=component.js.map