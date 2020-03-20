/**
 * Modified from https://github.com/openfaas/openfaas-cloud/blob/master/dashboard/of-cloud-dashboard/handler.js
 */

'use strict';

const fs = require('fs');
const request = require('request');


module.exports = (event, context) => {
  const { method, path } = event;

  if (!(method == 'GET' || method == 'POST')) {
    context.status(400).fail('Bad Request');
    return;
  }

  if (/^\/logout\/?$/.test(path)) {
    return handleLogout(context);
  }

  const gatewayUrl = process.env.gateway_url.replace(/\/$/, '');
  if (/^\/api\/(list-functions|system-metrics|pipeline-log).*/.test(path)) {
    // proxy api requests to the gateway
    const proxyPath = path.replace(/^\/api\//, '');
    const url = `${gatewayUrl}/function/${proxyPath}`;
    var reqHeaders = event.headers;
    reqHeaders['host'] = gatewayUrl.replace('http://', '');
    console.log(`proxying request to: ${url}`);
    request(
      {
        url,
        method,
        headers: reqHeaders,
        qs: event.query,
      },
      (err, response, body) => {
        console.log('proxy response code:', response.statusCode);
        if (err) {
          console.log('Proxy request failed', err);
          context.status(500).fail('Proxy Request Failed');
          return;
        }
        context
          .headers(response.headers)
          .status(response.statusCode)
          .succeed(body);
      }
    );
    return;
  }

  let headers = {
    'Content-Type': '',
  };
  if (/.*\.js/.test(path)) {
    headers['Content-Type'] = 'application/javascript';
  } else if (/.*\.css/.test(path)) {
    headers['Content-Type'] = 'text/css';
  } else if (/.*\.svg/.test(path)) {
    headers['Content-Type'] = 'image/svg+xml';
  } else if (/.*\.png/.test(path)) {
    headers['Content-Type'] = 'image/x-icon';
  } else if (/.*\.ico/.test(path)) {
    headers['Content-Type'] = 'image/x-icon';
  } else if (/.*\.json/.test(path)) {
    headers['Content-Type'] = 'application/json';
  } else if (/.*\.map/.test(path)) {
    headers['Content-Type'] = 'application/octet-stream';
  }

  let contentPath = `${__dirname}/dist${path}`;

  if (!headers['Content-Type']) {
    contentPath = `${__dirname}/dist/index.html`;
  }

  fs.readFile(contentPath, (err, data) => {
    if (err) {
      context
        .headers(headers)
        .status(500)
        .fail(err);

      return;
    }

    let content = data.toString();

    if (!headers['Content-Type']) {
      headers['Content-Type'] = 'text/html';

      // const isSignedIn = /openfaas_cloud_token=.*\s*/.test(event.headers.cookie);

      const { base_href, public_url, pretty_url, query_pretty_url, websocket_url } = process.env;
      content = content.replace(/__BASE_HREF__/g, base_href);
      content = content.replace(/__PUBLIC_URL__/g, public_url);
      content = content.replace(/__PRETTY_URL__/g, pretty_url);
      content = content.replace(/__QUERY_PRETTY_URL__/g, query_pretty_url);
      content = content.replace(/__WEBSOCKET_URL__/g, websocket_url);
      content = content.replace(/__GATEWAY__/g, gatewayUrl);
      // content = content.replace(/__IS_SIGNED_IN__/g, isSignedIn);
    }

    context
      .headers(headers)
      .status(200)
      .succeed(content);
  });
};
