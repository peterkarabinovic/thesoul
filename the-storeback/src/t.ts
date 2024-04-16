const dd = `
https://accounts.google.com/InteractiveLogin/signinchooser?continue=https%3A%2F%2Faccounts.google.com%2Fgsi%2Fselect%3Fclient_id%3D642735852698-2vtm3git8tna1l9mdauajhgu84o523l2.apps.googleusercontent.com%26ux_mode%3Dredirect%26login_uri%3Dhttps%3A%2F%2Fwww.skroutz.gr%2Fusers%2Fgoogle%26ui_mode%3Dcard%26as%3DuNRfMu2hqzUn%252BJSsPqMgvg%26g_csrf_token%3D5fa7f0da334e20d3%26origin%3Dhttps%3A%2F%2Fwww.skroutz.gr&faa=1&ifkv=ARZ0qKIR0XYcETyNZKX5VkqykIQPWszGTz8y_qsgARqN1_bVd8jI0lOhBK5txzjQcUVYL8Ql3_8xsg&theme=mn&ddm=0&flowName=GlifWebSignIn&flowEntry=ServiceLogin
`;
console.log(decodeURIComponent(dd).split(/&|\?/).join("\n"))
decodeURIComponent(dd);




for (const ev in process.env) {
    console.log(ev,"=", process.env[ev]
    );
}

function replaceEnvVars(str: string){
    return str.replace(/\$\{(\w+)\}/g, (_, key) => {
        if( !(key in process.env) )
            throw new Error(`Environment variable ${key} not found`);
        return process.env[key] || '';
    });
}

console.log(replaceEnvVars("Kino i ${JAVA_HOME}"))