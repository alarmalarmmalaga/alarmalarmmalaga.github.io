<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
                xmlns:xhtml="http://www.w3.org/1999/xhtml"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
    <xsl:template match="/">
        <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
                <title>XML Sitemap - Alarm! Alarm!</title>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <style type="text/css">
                    body {
                        font-family: 'Courier New', Courier, monospace;
                        font-size: 14px;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 20px;
                    }
                    table {
                        border-collapse: collapse;
                        width: 100%;
                        background-color: #fff;
                        box-shadow: 0 0 10px rgba(0,0,0,0.1);
                    }
                    th {
                        background-color: #000;
                        color: #fff;
                        text-align: left;
                        padding: 12px;
                        text-transform: uppercase;
                    }
                    td {
                        padding: 10px;
                        border-bottom: 1px solid #ddd;
                        word-break: break-all;
                    }
                    tr:hover {
                        background-color: #f9f9f9;
                    }
                    a {
                        color: #000;
                        font-weight: bold;
                        text-decoration: none;
                        border-bottom: 2px solid #ff0000;
                    }
                    a:hover {
                        background-color: #ff0000;
                        color: #fff;
                    }
                    .header {
                        margin-bottom: 20px;
                        border-bottom: 5px solid #000;
                        padding-bottom: 10px;
                    }
                    .header h1 {
                        margin: 0;
                        font-size: 28px;
                    }
                    .metadata {
                        font-size: 12px;
                        color: #666;
                        margin-top: 5px;
                    }
                    .media-info {
                        font-size: 12px;
                        background: #eee;
                        padding: 5px;
                        margin-top: 5px;
                        display: inline-block;
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>ALARM! ALARM! - XML SITEMAP</h1>
                    <div class="metadata">
                        This sitemap contains <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URLs.
                        Generated for Search Engines (Google, Bing, DuckDuckGo) and AI Crawlers.
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>URL</th>
                            <th>Priority</th>
                            <th>Change Freq</th>
                            <th>Last Modified</th>
                            <th>Media / Alts</th>
                        </tr>
                    </thead>
                    <tbody>
                        <xsl:for-each select="sitemap:urlset/sitemap:url">
                            <tr>
                                <td>
                                    <a href="{sitemap:loc}">
                                        <xsl:value-of select="sitemap:loc"/>
                                    </a>
                                </td>
                                <td>
                                    <xsl:value-of select="sitemap:priority"/>
                                </td>
                                <td>
                                    <xsl:value-of select="sitemap:changefreq"/>
                                </td>
                                <td>
                                    <xsl:value-of select="sitemap:lastmod"/>
                                </td>
                                <td>
                                    <xsl:if test="count(image:image) &gt; 0">
                                        <div class="media-info">
                                            IMAGE: <xsl:value-of select="image:image/image:title"/>
                                        </div>
                                    </xsl:if>
                                    <xsl:if test="count(video:video) &gt; 0">
                                        <div class="media-info">
                                            VIDEO: <xsl:value-of select="video:video/video:title"/>
                                        </div>
                                    </xsl:if>
                                    <xsl:if test="count(xhtml:link) &gt; 0">
                                        <div class="metadata">
                                            Alts: <xsl:value-of select="count(xhtml:link)"/> languages
                                        </div>
                                    </xsl:if>
                                </td>
                            </tr>
                        </xsl:for-each>
                    </tbody>
                </table>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
