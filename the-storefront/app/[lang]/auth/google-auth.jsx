'use client'
import { useEffect, useState } from 'react';
import Script from 'next/script'

export function GoogleAuthBtn(){
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    } , []);

    if (!isLoaded) {
        return null;
    }

    return (
        <div>
            <Script src="https://accounts.google.com/gsi/client" strategy='beforeInteractive' async />
            <div id="g_id_onload"
                    data-client_id="699864884660-p27gatdh9gktupsvre4i5ven636pmlkn.apps.googleusercontent.com"
                    data-context="signin"
                    data-ux_mode="redirect"
                    data-login_uri="http://localhost:3003/auth"
                    data-auto_prompt="false">
            </div>
            
            <div class="g_id_signin"
                    data-type="standard"
                    data-shape="rectangular"
                    data-theme="outline"
                    data-text="signin_with"
                    data-size="large"
                    data-locale="uk"
                    data-logo_alignment="left">
            </div>

        </div>
    );
}