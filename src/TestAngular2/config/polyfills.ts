﻿import "reflect-metadata";
import 'zone.js/dist/zone';
import 'hammerjs/hammer'; // Angular Material touch.

if (process.env.ENV === 'production') {
    // Production
} else {
    // Development
    Error['stackTraceLimit'] = Infinity;
    require('zone.js/dist/long-stack-trace-zone');
}