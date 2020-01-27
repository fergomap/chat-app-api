interface AppConfig {
    REALTIME_HEADERS: any;
    RESPONSE_CODES: {
        OK: number;
        BAD_REQUEST: number;
        NOT_FOUND: number;
    };
    ENDPOINTS: {
        MESSAGE: string;
        LISTEN_CHATS: string;
        STATUS: string;
        SEARCH_CLIENT: string;
        CHECK_CLIENT_CONNECTED: string;
        CREATE_CHAT: string;
    };
}

export const APP_CONSTANTS: AppConfig = {
    REALTIME_HEADERS: {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    },
    RESPONSE_CODES: {
        OK: 200,
        BAD_REQUEST: 400,
        NOT_FOUND: 404
    },
    ENDPOINTS: {
        MESSAGE: '/message',
        LISTEN_CHATS: '/chats/:username',
        STATUS: '/status',
        SEARCH_CLIENT: '/search-client/:emitter/:receiver',
        CHECK_CLIENT_CONNECTED: '/check-client-connected/:username',
        CREATE_CHAT: '/create-chat'
    }
};
