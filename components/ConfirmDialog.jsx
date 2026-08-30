'use client';

import React from 'react';
import Modal from './Modal';
import { AlertTriangle } from 'lucide-react';
import { MotionButton } from './MotionWrapper';

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to delete this item? This action cannot be undone.',
  confirmText = 'Delete',
  cancelText = 'Cancel',
  isDestructive = true,
  isLoading = false,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="max-w-md">
      <div className="flex flex-col items-center text-center pt-2 pb-4">
        <div className="w-14 h-14 rounded-full bg-brown-900/60 border border-amber-600/40 flex items-center justify-center mb-4 text-amber-400">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <p className="text-brown-200 text-sm leading-relaxed mb-6">
          {message}
        </p>

        <div className="flex items-center justify-center gap-3 w-full">
          <MotionButton
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 px-5 py-3 rounded-xl border border-brown-700 bg-brown-900/40 text-brown-300 hover:text-brown-100 hover:bg-brown-800/60 font-semibold text-sm transition-all"
          >
            {cancelText}
          </MotionButton>
          <MotionButton
            onClick={onConfirm}
            disabled={isLoading}
            className={`flex-1 px-5 py-3 rounded-xl font-bold text-sm text-brown-950 transition-all ${
              isDestructive
                ? 'bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400'
                : 'btn-gold'
            }`}
          >
            {isLoading ? 'Processing...' : confirmText}
          </MotionButton>
        </div>
      </div>
    </Modal>
  );
}
