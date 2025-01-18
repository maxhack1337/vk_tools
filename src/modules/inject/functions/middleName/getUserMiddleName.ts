interface Owner {
    nickname: string;
}

interface Store {
    getState: () => {
        owner: Owner;
    };
}

interface ReactProps {
    fiber?: any;
    memoizedState?: {
        element?: {
            props?: {
                store?: Store;
            };
        };
    };
    container?: any;
}

const getUserMiddleName = async (objectId: number) => {
    try {
        const rootProfileElement = document.getElementById("react_rootprofile");
        const rootProfile = _o(rootProfileElement).container;
        if (rootProfile?.memoizedState?.element?.props?.store?.getState) { 
            const response = rootProfile.memoizedState.element.props.store.getState().owner.nickname;
            return response;
        } else {
            throw new Error("Invalid structure of rootProfile");
        }
    } catch (error) {
        console.error(error);
        return [];
    }
}

function _o(e: HTMLElement | null): ReactProps { 
    const t: ReactProps = {}; 
    if (!e) return t;

    for (const n of Object.keys(e)) {
        if (n.startsWith("__reactFiber")) t.fiber = e[n as keyof HTMLElement];
        
        if (n.startsWith("__reactProps")) {
            const propsValue = e[n as keyof HTMLElement];
            if (typeof propsValue === 'object' && propsValue !== null) { 
                // Приведение типа для propsValue
                const props = propsValue as { store?: Store }; // Указываем ожидаемую структуру
                
                // Инициализируем memoizeState перед использованием
                t.memoizedState = t.memoizedState || {}; // Инициализация
                t.memoizedState.element = t.memoizedState.element || {}; // Инициализация element
                t.memoizedState.element.props = { store: props.store }; // Теперь это безопасно
            }
        }

        if (n.startsWith("__reactContainer")) t.container = e[n as keyof HTMLElement];
    }
    
    return t;
}

export default getUserMiddleName;
