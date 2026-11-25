"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

/**
 * Single place where GSAP plugins are registered. Every animation
 * utility in lib/animations imports gsap/ScrollTrigger from here
 * instead of registering the plugin itself, so it only ever happens
 * once for the whole app.
 *
 * ScrollToPlugin is used by the WellnessJourney section to smoothly
 * scroll the pinned progress into position when a step is clicked.
 */
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export { gsap, ScrollTrigger };
