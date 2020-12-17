---
title: "View Network Traffic for Mobile Apps"
date: "2019-01-25"
---

<img style="float: right;padding-left:10px;"
src="https://s3.amazonaws.com/roush-image/hackermanx200.jpg" alt="Mr. Robot" />

I've watched a lot of Mr. Robot. I also have been binging two great podcast on hacking/IT security: *Darknet Diaries* and *Hackable?*. These shows have made me slightly paranoid about application security. 


It made me wonder, how can I see network request on a phone app?

This is possible, but we will need to setup a [proxy](https://en.wikipedia.org/wiki/Proxy_server).



## Setup 
Setup is based on running MITM proxy through my Mac, and client is my iPhone.


First you'll want to install [MITM Proxy](https://mitmproxy.org/). The proxy will act as *Man in the Middle*, taking the request from your device and sending them to the server as well as taking server responses and sending to your device.

To install I'll use [HomeBrew](https://brew.sh/).  
`brew install mitm proxy`

Next we need to get the local IP address of your proxy device.  
`ifconfig | grep inet`  
ip should be between inet and netmask (not 127.0.0.1)  

or 

 *System Preferences > Network > Advanced > TCP/IP.*  
![](https://s3.amazonaws.com/roush-image/ipaddressmacx645.jpg)

Now we will need to tell our client device to send traffic to the computer running MITM proxy. 

In the settings App for your client device go into your specific wifi settings for the network and select configure proxy.

![](https://s3.amazonaws.com/roush-image/iphone-config-proxyx400.jpg)

You're almost ready to start proxying. Except we need to get a certificate on our device so we can intercept `https` traffic. Go to `mitm.it` on your proxy configured client. Then select the certificate to install. Verify you have *full trust* enabled. I was only able to complete this step using iOS safari.

### Now your ready to Proxy!

Open up your terminal and run `mitmproxy` open an app on your phone. You will now see network request begin to pour in. *If you are having trouble connecting, try renewing the DCHP Lease. Sometimes the IP your device is pointing to gets changed.*

![](https://s3.amazonaws.com/roush-image/mitm-proxy-terminalx450.jpg)

## But how come Snapchat/Facebook/Instagram/Siri/etc is broken?

Some apps use certificate pinning which is best explained [here](https://infinum.co/the-capsized-eight/securing-mobile-banking-on-android-with-ssl-certificate-pinning). This means that the app won't even look at the certificate that we downloaded because the value is hard-coded into the app. Currently there are no *easy* ways to get these request to work without having the traffic bypass the proxy.

## App Transparency

MITM Proxy gives a cool look into how mobile applications work. Some practical use cases is creating a wrapper for an undocumented API or looking into security practices. While, the browser is good about warning us when we are getting content served over http instead of https, with mobile applications that responsibility is on the developer. There is less transparency relating to network request compared to a web application.

If you are curious about the implications of insecure network request, I suggest you checkout the *Hackable?* podcast titled [pet-nology](https://hackablepodcast.com/episodes/pet-nology) . 
