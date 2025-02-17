import React from 'react';

interface TextFormatterProps {
    text: string;
}


const TextFormatter: React.FC<TextFormatterProps> = ({ text }) => {
    const lines = text.split('\n');

    // Convert header with ** to a strong element but keep * around the text


    return (
        <>
            {lines.map((line, index) => {

                if (line.trim().startsWith('-')) {
                    return (

                        <li key={index}><ProcessBoldText line={line.replace("- ", "")} /></li>
                    )
                } else {
                    return <RenderLine key={index} line={line} />
                }
            })}

        </>
    );
};

export default TextFormatter;

interface RenderLineProps {
    line: string;
}

function RenderLine({ line }: RenderLineProps) {

    return <p><ProcessBoldText line={line} /></p>
}

function ProcessBoldText({ line }: { line: string }) {
    const parts = line.split('*');

    return parts.map((part, index) => {
        if (index % 2 === 0) {
            return <span>{part}</span>
        }
        return <strong>{part}</strong>
    })
}