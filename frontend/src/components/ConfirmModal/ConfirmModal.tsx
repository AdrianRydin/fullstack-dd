import "./confirmModal.css";

interface ConfirmModalProps {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmModal({
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isLoading = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <section className="modal-backdrop" role="dialog" aria-modal="true">
      <article className="modal">
        <h2 className="modal-title">{title}</h2>
        <p className="modal-message">{message}</p>
        <div className="modal-actions">
          <button className="modal-btn" onClick={onCancel} disabled={isLoading}>
            {cancelText}
          </button>
          <button
            className="modal-btn modal-btn--danger"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Cancelling..." : confirmText}
          </button>
        </div>
      </article>
    </section>
  );
}

export default ConfirmModal;
