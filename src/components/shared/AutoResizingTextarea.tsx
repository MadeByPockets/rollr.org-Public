"use client"

import React, {Dispatch, SetStateAction, useEffect} from 'react';

interface IAutoResizingTextareaProps {
    isInEditMode: boolean;
    onChange: Dispatch<SetStateAction<string>>;
    textareaRef: React.RefObject<HTMLTextAreaElement>;
    value: string;
}

const AutoResizingTextarea: React.FC<IAutoResizingTextareaProps> = (props: IAutoResizingTextareaProps) => {
    const { isInEditMode, onChange, textareaRef, value } = props;

    useEffect(() => {
        if (isInEditMode && textareaRef.current) {
            const textarea = textareaRef.current;

            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, [isInEditMode, textareaRef, value]); // Run effect when entering edit mode or value changes

    return (
        <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={{
                backgroundColor: '#fffbea',
                overflow: 'hidden',
                resize: 'none',
                width: '100%'
            }}
        />
    );
}

export default AutoResizingTextarea;
