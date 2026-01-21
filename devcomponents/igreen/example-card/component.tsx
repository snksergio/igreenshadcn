import React from 'react';
import { ExampleCardProps } from './types';
import { cardStyles } from './styles';
import { cn } from '@/lib/utils';

export const ExampleCard: React.FC<ExampleCardProps> = ({ title, description, variant = 'default' }) => {
    return (
        <div className={cn(cardStyles.container, cardStyles.variants[variant])}>
            <h3 className={cardStyles.title}>{title}</h3>
            <p className={cardStyles.description}>{description}</p>
        </div>
    );
};
