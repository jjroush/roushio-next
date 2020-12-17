---
title: 'What is HTTP 2 and should I care?'
date: '2019-07-15'
keywords: 'http2, protocol, web performance'
---

![HTTP2 80's cover](https://roush-image.s3.amazonaws.com/http2-cover.jpg)

As a developer, I began looking into HTTP2 because I noticed Node.js 12.6 was implementing [native support](https://nodejs.org/api/http2.html). As I dug in, it was puzzling why people weren't making a bigger deal out of the update of the 20+ year-old HTTP 1.1 spec.

There were fewer examples than I anticipated for setting up Node.js HTTP2 which was confusing because javascript developers are always ahead of the curve. I realized HTTP2 must be the most utmost of _cutting edge_

## HTTP mini history lesson

The Hypertext Transfer Protocol is how we access information on that good old world wide web. It's the application-level protocol used for a client to communicate with a server.
HTTP 1.1 came out in 1997. A lot has changed since 1997, HTTP hadn't. That was until 2015.

## Should I care?

**Yes.**

It is a great all-around performance improvement. The amount of work to implement is dependent on the stack you're using. Currently, ~30% of the web [uses HTTP2](https://w3techs.com/technologies/details/ce-http2/all/all).

### Speed Test (It's Faster)

With a quick unscienfic test of my own site toggling http2 on and off; I found my website containing ~20 network request was about 12% faster with HTTP2. A [_CSS Tricks_](https://css-tricks.com/) test shows a 25% speed improvement.

HTTP2 speed improvements will be more noticed on a site with a greater number of network request and a client with a slower connection.

It's faster due to the transferred data format being binary instead of text, multiplexing, reuse of TCP connections... I'll spare you the nitty-gritty but if you're into that, the spec's [FAQ page](https://http2.github.io/faq/) is a great start. I found a sick [real-world example](https://imagekit.io/demo/http2-vs-http1) too.

### Server Push

A great feature of HTTP2 is server push. On the request for the original HTML document, you can tell the server to send: the document requested, stylesheet, and javascript all together. Any resource that you don't want to cache but know the user will need is a good candidate for server push.

## Implementation

The easy-ness or difficulty of implementing HTTP2 depends on the server. Node.js involves a couple of extra lines of code to tell your preferred server framework to use Node's HTTP2 server. With .NET and .Net core frameworks, HTTP2 support comes from the operating system. Windows 10 or Windows Server 2016. Now in both Node and .NET scenarios, a part of HTTP2 is enforcing TLS. So if you want to move to the modern era of the web, you'll need an SSL certificate. And no exception for localhost.

When attempting to implement HTTP2 on some projects I'm a part of, I noticed something. If you are using CloudFlare, you get HTTP2 for free [out of the box](https://www.cloudflare.com/website-optimization/). Including features like server push. Amazon's CloudFront also has HTTP2 out of the box. I am kind of surprised this isn't more of a selling point for web service providers.

### Check if you're using it now

Hopefully you're at least a little amped for HTTP2, even if its just 12% amped up. To see if your website is using it:

1. Go to the network tab of your favorite browser (chrome or firefox).
1. Right click the network table header selecting `protocol`.
1. Refresh the page.

<img src ="https://roush-image.s3.amazonaws.com/http2-firefox-devtools.jpg"/>

It's important to note that HTTP2 is dependent on the server hosting the resource, so if using an image CDN is without support for HTTP2, your site may support the latest and greatest stuff but images may not benefit from the speed increase.

## Conclusion

Now hold up before you feel to excited for feeling ahead of the curve on this HTTP stuff. In 2018 **HTTP3** began to enter the market. Originally developed by Google under the name of Quic; HTTP3 is set to become a [standard](https://quicwg.org/base-drafts/draft-ietf-quic-http.html) sometime soon.

For now though, I'll just make sure I'm caught up with 2015's technology.

<a href="http://www.commitstrip.com/en/2018/11/15/http-3/">
<img src="https://roush-image.s3.amazonaws.com/http-commit-strip.jpg" alt="http3 commit strip" />
</a>

I swear there's a _Commit Strip_ for everything...
