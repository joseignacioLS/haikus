import { type THaiku } from "../types";

export const ShareButton = ({ id }: { id: THaiku["id"] }) => {
  const copyShareLinkToClipboard = () => {
    navigator.clipboard
      .writeText(`${window.location.host}/${id}`)
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
        src={`/share.svg`}
        alt="Icono de compartir"
      />
    </button>
  );
};
