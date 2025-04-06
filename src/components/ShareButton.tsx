import { modalStore } from "../store/Modal";
import { toastStore } from "../store/Toast";
import { type THaiku } from "../types";

export const ShareButton = ({ id }: { id: THaiku["id"] }) => {
  const copyShareLinkToClipboard = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/${id}`)
      .then(() => {
        toastStore.set(`Se ha copiado la url del haiku #${id}`);
        modalStore.set(null);
      });
  };
  return (
    <button
      className={`round`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        copyShareLinkToClipboard();
      }}
    >
      <img src={`/icons/share.svg`} alt="Icono de compartir" />
    </button>
  );
};
