import React from 'react';

type LoadingProps = {
    text?: string;
};

const Loading: React.FC<LoadingProps> = ({ text = 'Loading...' }) => (
    <div className='position-absolute z-3 w-100 h-100 bg-white' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 16, flex: 1, justifyContent: 'center' }}>
        <div className="spinner"
            style={{
                width: 32,
                height: 32,
                border: '4px solid #ccc',
                borderTop: '4px solid #007bff',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                marginBottom: 8,
        }} />
        <span>{text}</span>
        <style>
            {`
                @keyframes spin {
                    0% { transform: rotate(0deg);}
                    100% { transform: rotate(360deg);}
                }
            `}
        </style>
    </div>
);

export default Loading;