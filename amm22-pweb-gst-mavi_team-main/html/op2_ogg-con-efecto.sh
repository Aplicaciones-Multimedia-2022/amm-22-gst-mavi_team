#!/bin/sh

gst-launch-1.0 filesrc location=Trailer__American_Cinematographers_in_the_Great_War_.ogg ! oggdemux ! theoradec ! videobalance saturation=0.0 !videoconvert ! clockoverlay shaded-background=true font-desc="Sans 38" ! queue ! theoraenc ! queue ! m. oggmux name=m ! queue ! tcpserversink host=127.0.0.1 port=9090
