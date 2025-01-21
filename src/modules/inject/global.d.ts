interface VKEnh {
    setEnglishMusic?: number;
}

interface URL {
    urls: any;
}

interface Page {
    audioStatusUpdate: any;
}

interface navGoLoc {
	0?: string;
	section?: string;
	w?: string;
}

interface Ajax {
    post: (url: string, data: Record<string, any>, options?: any) => Promise<any>;
    promisifiedPost: (url:string, data: Record<string, any>, options?: any) => Promise<any>;
}

interface AjaxPostArgs {
    url: string;
    data: Record<string, any>; 
    options?: any;
}

interface navGoLocProps extends navGoLoc {
	act?: string;
	z?: string;
}

interface Calls {
    isIncomingModalHidden?: boolean;
}

interface BrowserEnv {
  api: {
    fetch: (method: string, params: any, ...args: any[]) => Promise<any>;
  };
}

interface FeatureFlags {
    [key: string]: boolean | number;
}

interface Store {
    featureFlags: FeatureFlags;
}

interface MECommonContextType {
    browserEnv: BrowserEnv;
    store: Store;
    engine: any;
}

export interface Nav {
	removeNavigationStartListener: (callback: (locStr: string) => void) => void;
	subscribeOnModuleEvaluated: (callback: () => void, once?: boolean) => void;
	unsubscribeOnModuleEvaluated: (callback: () => void) => void;
	strLoc: string;
	toStr(string: navGoLocProps): string;
	fromStr(string: string): navGoLocProps;
	objLoc: navGoLocProps;
	setLoc(loc: navGoLocProps): void;
	go(loc: navGoLoc | string, ev?: string | null | Event, opts?: Record<string, any>): void;
	change: (loc: navGoLoc, ev?: string | null, opts?: Record<string, any>) => void;
	onLocationChange: (handler: (locStr: string) => unknown) => () => void;
    addNavigationStartListener: (handler: (locStr: string) => unknown) => () => void;
    reload: () => void;
}

export interface Cur {
    module: string;
    pvCurPhoto: any;
    pvPhoto: any;
    videoInlinePlayer: any;
}

export interface VK {
	id: number;
    pe: Record<string, any>;
    lang: number;
    ip_h: string;
    statusExportHash: string;
}

export interface VKAPI {
	api: (
        method: string,
        payload: any
	) => Promise<>;
}

export interface Feed {
	init: (state: unknown) => unknown;
}

export interface WallInitProps {
	wall_oid?: number;
	public_link?: string;
	loc?: string;
	owner?: {
		id: number;
		name: string;
		photo: string;
	};
	wall_tpl: {
		profileData: [profileId: number, photo: string, href: string, name: string];
		ownerData: [ownerId: number, photo: string, href: string, name: string];
	};
	only_official?: boolean;
}

export interface Wall {
	init: (props: WallInitProps) => void;
	votingUpdateFull: (_: string, e: string) => void;
	initReplyEditable: (replyBox: HTMLElement, replyField: HTMLElement, postId: string) => void;
	showEditReply: (
		postId: string,
		e?: unknown,
		o?: boolean,
		i?: boolean,
		focus?: boolean,
		onInited?: () => void
	) => void;
	_cvf_hooked?: boolean;
}

export interface stManager {
	add(statics: string | string[]): Promise<void>;
}

export interface Notifier {
	showEvent: (props: { title?: string; text?: string }) => void;
}

declare global {
    var browser: typeof globalThis.chrome;
    var noAdsAtAll: boolean;
    var vkenh: VKEnh;
	var Feed: Feed;
	var nav: Nav;
    var cur: Cur;
    var urls: URL | null;
	var ge: (id: string) => HTMLElement;
	var data: (elem: HTMLElement, prop: string, value: string) => void;
	var addEvent: (elem: HTMLElement, event: string, handler: EventListenerOrEventListenerObject) => void;
	var removeEvent: (elem: HTMLElement, event: string) => void;
	var Video: Record<string, any>;
	var vk: VK;
    var vkApi: VKAPI;
	var Wall: Wall;
	var templates: Record<string, string>;
	var stManager: stManager;
	var jsc: (module: string) => string;
	var Notifier: Notifier;
    var HotBarAppearVAL: string[];
	var getLang: null | ((key: string, type?: string | number) => string | string[]);
	var langDate: (timestamp: number, text: string, mode?: string | number, months?: string | string[]) => string;
    var langNumeric: (n: number, s: string | string[]) => string;
    var webkitSpeechRecognition: typeof SpeechRecognition;
    var showPhoto: null | ((id: string, oid: number | string, pid: any) => void);
    var langConfig: any;
    var MessageBox: any;
    var Calls: Calls;
    var MECommonContext: Promise<MECommonContextType>;
    var page: Page;
    var ap: any;
    var ajax: any;
    var parseCyr: any;
    var addLangKeys: any;
    var friendsSection: string | null | HTMLElement;
    var aHrefSectionFrens: any;
    var showWiki: any;
    var imReady: any;
    var mvcur: any;
    var each: any;
    
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: 'development' | 'production';
		}
	}
}