import { type THaiku } from "../types";

export const ShareButton = ({ id }: { id: THaiku["id"] }) => {
  const copyShareLinkToClipboard = () => {
    navigator.clipboard
      .writeText(`${window.location.host}${import.meta.env.BASE_URL}${id}`)
      .then(
        () =>
          !(navigator as any).userAgentData?.mobile &&
          alert(`Se ha copiado la url del haiku #${id}`)
      );
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
      <img
        src={`${import.meta.env.BASE_URL}share.svg`}
        alt="Icono de compartir"
      />
    </button>
  );
};
