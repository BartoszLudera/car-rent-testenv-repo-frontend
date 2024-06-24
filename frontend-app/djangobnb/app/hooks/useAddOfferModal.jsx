import create from 'zustand';

const useAddOfferModal = create((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false })
}));

export default useAddOfferModal;
