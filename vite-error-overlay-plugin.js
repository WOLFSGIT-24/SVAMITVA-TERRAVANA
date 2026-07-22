// No-op plugin for standalone mode
export default function customErrorOverlayPlugin() {
  return { name: 'custom-error-overlay' };
}

export class ErrorOverlay {}
