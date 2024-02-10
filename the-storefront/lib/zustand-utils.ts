import { UseBoundStore, StoreApi } from 'zustand'

/**
 * Sync property from one Store to property to another Strore
 * used when we need to have connection between two stores 
 * @param store 
 * @param getter 
 * @param onChange 
 * @returns 
 */
export function syncProperty<STATE, VAL>(
    store: UseBoundStore<StoreApi<STATE>>, 
    getter: (state:STATE) => VAL, 
    onChange: (val:VAL) => void)
{
    const value = getter(store.getState());
    store.subscribe(state => onChange(getter(state)) );
    return value;
}
