// Copyright (c) Microsoft. All rights reserved.

import { Body1, Spinner, Title3 } from '@fluentui/react-components';
import { FC, useEffect } from 'react';

interface IData {
    uri: string;
    onBackendFound: () => void;
}

const BackendProbe: FC<IData> = ({ uri, onBackendFound }) => {
    useEffect(() => {
        const timer = setInterval(() => {
            const requestUrl = new URL('healthz', uri);
            const fetchAsync = async () => {
                try {
                    var result = await fetch(requestUrl);

                    if (result.ok) {
                        onBackendFound();
                    }
                } catch { }
            };

            fetchAsync();
        }, 3000);

        return () => clearInterval(timer);
    });

    return (
        <div style={{ padding: 80, gap: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Title3>Looking for your backend</Title3>
            <Spinner />
            <Body1>
                Can't find API at <strong>{uri}</strong>
            </Body1>
        </div>
    );
};

export default BackendProbe;
