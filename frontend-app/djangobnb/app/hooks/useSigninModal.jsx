import create from 'zustand';

const useSigninModal = create((set) => ({
    isOpen: false,
    open: () => set({isOpen: true}),
    close: () => set({isOpen: false})
}));

export default useSigninModal;