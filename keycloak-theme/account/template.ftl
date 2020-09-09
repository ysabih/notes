<#macro mainLayout active bodyClass>
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="robots" content="noindex, nofollow">
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <title>${msg("accountManagementTitle")}</title>
    <link rel="icon" href="${url.resourcesPath}/img/favicon.ico">
    <#if properties.styles?has_content>
        <#list properties.styles?split(' ') as style>
            <link href="${url.resourcesPath}/${style}" rel="stylesheet" />
        </#list>
    </#if>
    <#if properties.scripts?has_content>
        <#list properties.scripts?split(' ') as script>
            <script type="text/javascript" src="${url.resourcesPath}/${script}"></script>
        </#list>
    </#if>
</head>
<body class="admin-console user ${bodyClass}">
        
    <nav class="navbar bg-light navbar-expand-lg fixed-top shadow-box shadow-sm" style='height: 60px'>
        <div className="navbar-brand">
            <img src="${url.resourcesPath}/img/app_logo.png" alt="logo" height="40" class="d-inline-block align-top">
        </div>
        <#if referrer?has_content && referrer.url?has_content>
            <a class="ml-auto" href="${referrer.url}" id="referrer" style="fill: #007bff">
                <img src="${url.resourcesPath}/img/home-solid.svg" height="30">
            </a>
        </#if>
    </nav>

    <div class="container" style='margin-top: 80px'>
        <nav class="nav nav-pills nav-fill">
            <a class="nav-item nav-link <#if active=='account'>active</#if>" href="${url.accountUrl}">${msg("account")}</a>
            <#if features.passwordUpdateSupported><a class="nav-item nav-link <#if active=='password'>active</#if>" href="${url.passwordUrl}">${msg("password")}</a></#if>
            <a class="nav-item nav-link <#if active=='sessions'>active</#if>" href="${url.sessionsUrl}">${msg("sessions")}</a>
        </nav>

        <div id="content-myst" class="mt-5">
            <#if message?has_content>
                <div class="alert alert-${message.type}">
                    <#if message.type=='success' ><span class="pficon pficon-ok"></span></#if>
                    <#if message.type=='error' ><span class="pficon pficon-error-circle-o"></span></#if>
                    <span class="kc-feedback-text">${kcSanitize(message.summary)?no_esc}</span>
                </div>
            </#if>

            <#nested "content">
        </div>
    </div>

</body>
</html>
</#macro>