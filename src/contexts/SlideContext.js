import React, { useReducer, createContext } from 'react';

const initialState = {
    currentSlideIndex: 0
};

const SlideIndexContext = createContext({
    currentSlideIndex: 0,
    nextSlide: () => { },
    prevSlide: () => { }
});

const SlideIndexReducer = (state, action) => {
    switch (action.type) {
        case 'NEXT': {
            return {
                ...state,
                currentSlideIndex: (state.currentSlideIndex + 1) % action.payload
            }
        }
        case 'PREV': {
            return {
                ...state,
                currentSlideIndex: (state.currentSlideIndex === 0) ? action.payload - 1 : state.currentSlideIndex - 1
            }
        }
        default:
            return state
    }
};

const SlideIndexProvider = (props) => {
    const [state, dispatch] = useReducer(SlideIndexReducer, initialState);
    const nextSlide = (len) => {
        dispatch({
            type: 'NEXT',
            payload: len
        });
    };
    const prevSlide = (len) => {
        dispatch({
            type: 'PREV',
            payload: len
        });
    };
    return <SlideIndexContext.Provider value={{
        currentSlideIndex: state.currentSlideIndex,
        nextSlide,
        prevSlide
    }} {...props} />
};

export {
    SlideIndexContext,
    SlideIndexProvider
}
