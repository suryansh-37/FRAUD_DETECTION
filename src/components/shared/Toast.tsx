import { X } from 'lucide-react';

export function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="toast-note" data-testid="status-toast">
      {message}
      <button
        onClick={onClose}
        aria-label="Dismiss notification"
        data-testid="button-dismiss-toast"
        style={{ marginLeft: 14, color: 'inherit', background: 'transparent', border: 0 }}
      >
        <X size={13} />
      </button>
    </div>
  );
}
