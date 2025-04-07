interface Window {
  VG_CHATBOT?: {
    open: () => void;
    close: () => void;
    toggle: () => void;
  };
  VG_CONFIG?: {
    ID: string;
    region: string;
    render: string;
    stylesheets: string[];
    [key: string]: any;
  };
} 