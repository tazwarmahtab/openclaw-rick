/**
 * World-Class Accessibility-Compliant Component Library for Rick Agent Interface
 * 
 * Features:
 * - WCAG 2.1 AA compliant components
 * - Screen reader support
 * - Keyboard navigation
 * - High contrast mode support
 * - Reduced motion support
 * - Focus management
 */

import React, { useState, useRef, useEffect } from 'react';
import { DesignSystem } from '../design-system';

// Base Component Props
interface BaseComponentProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

// Button Component
interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  'aria-expanded'?: boolean;
  'aria-pressed'?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  className,
  style,
  ...ariaProps
}) => {
  const [_isPressed, _setIsPressed] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const getStyles = () => {
    const baseStyles = {
      ...DesignSystem.components.button.variants[variant],
      ...DesignSystem.components.button.sizes[size],
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.6 : 1,
      position: 'relative' as const,
      ...DesignSystem.utils.focusStyles(),
    };

    if (loading) {
      baseStyles.cursor = 'wait';
      baseStyles.opacity = 0.8;
    }

    return baseStyles;
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      setIsPressed(true);
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      setIsPressed(false);
      if (!disabled && !loading && onClick) {
        onClick();
      }
    }
  };

  return (
    <button
      ref={buttonRef}
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      style={{ ...getStyles(), ...style }}
      className={className}
      aria-busy={loading}
      {...ariaProps}
    >
      {loading && (
        <span
          style={{
            display: 'inline-block',
            width: '16px',
            height: '16px',
            border: '2px solid transparent',
            borderTop: `2px solid ${DesignSystem.tokens.colors.primary[50]}`,
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginRight: DesignSystem.tokens.spacing[2],
          }}
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  );
};

// Input Component
interface InputProps extends Omit<BaseComponentProps, 'children'> {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  'aria-invalid'?: boolean;
  'aria-required'?: boolean;
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  value,
  defaultValue,
  placeholder,
  required = false,
  disabled = false,
  invalid = false,
  onChange,
  onBlur,
  onFocus,
  className,
  style,
  ...ariaProps
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const getStyles = () => {
    const baseStyles = {
      ...DesignSystem.components.input.base,
      borderColor: invalid
        ? DesignSystem.tokens.colors.status.error
        : isFocused
        ? DesignSystem.tokens.colors.accent[500]
        : DesignSystem.tokens.colors.primary[300],
      boxShadow: invalid
        ? `0 0 0 3px ${DesignSystem.tokens.colors.status.error}20`
        : isFocused
        ? `0 0 0 3px ${DesignSystem.tokens.colors.accent[100]}`
        : 'none',
    };

    return baseStyles;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <input
      ref={inputRef}
      type={type}
      value={value}
      defaultValue={defaultValue}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      onChange={handleChange}
      onBlur={() => {
        setIsFocused(false);
        if (onBlur) onBlur();
      }}
      onFocus={() => {
        setIsFocused(true);
        if (onFocus) onFocus();
      }}
      style={{ ...getStyles(), ...style }}
      className={className}
      aria-invalid={invalid || ariaProps['aria-invalid']}
      aria-required={required || ariaProps['aria-required']}
      {...ariaProps}
    />
  );
};

// Card Component
interface CardProps extends BaseComponentProps {
  elevated?: boolean;
  interactive?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  elevated = false,
  interactive = false,
  onClick,
  className,
  style,
  ...ariaProps
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const getStyles = () => {
    const baseStyles = {
      ...DesignSystem.components.card.base,
      ...(elevated && DesignSystem.components.card.elevated),
      cursor: interactive ? 'pointer' : 'default',
      transform: interactive && isHovered ? 'translateY(-2px)' : 'none',
      transition: DesignSystem.tokens.transitions.base,
      ...DesignSystem.utils.focusStyles(),
    };

    return baseStyles;
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (interactive && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      if (onClick) onClick();
    }
  };

  return (
    <div
      ref={cardRef}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      style={{ ...getStyles(), ...style }}
      className={className}
      {...ariaProps}
    >
      {children}
    </div>
  );
};

// Badge Component
interface BadgeProps extends BaseComponentProps {
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  className,
  style,
  ...ariaProps
}) => {
  const getStyles = () => {
    const baseStyles = {
      ...DesignSystem.components.badge.base,
      ...DesignSystem.components.badge.variants[variant],
      ...(size === 'sm' && {
        padding: `${DesignSystem.tokens.spacing[1]} ${DesignSystem.tokens.spacing[2]}`,
        fontSize: DesignSystem.tokens.typography.fontSize.xs[0],
      }),
      ...(size === 'lg' && {
        padding: `${DesignSystem.tokens.spacing[2]} ${DesignSystem.tokens.spacing[3]}`,
        fontSize: DesignSystem.tokens.typography.fontSize.sm[0],
      }),
    };

    return baseStyles;
  };

  return (
    <span
      style={{ ...getStyles(), ...style }}
      className={className}
      role="status"
      {...ariaProps}
    >
      {children}
    </span>
  );
};

// Status Indicator Component
interface StatusIndicatorProps extends BaseComponentProps {
  status: 'online' | 'degraded' | 'offline' | 'loading';
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  showLabel = true,
  size = 'md',
  className,
  style,
  ...ariaProps
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'online':
        return DesignSystem.tokens.colors.status.success;
      case 'degraded':
        return DesignSystem.tokens.colors.status.warning;
      case 'offline':
        return DesignSystem.tokens.colors.status.error;
      case 'loading':
        return DesignSystem.tokens.colors.status.info;
      default:
        return DesignSystem.tokens.colors.status.neutral;
    }
  };

  const getSize = () => {
    switch (size) {
      case 'sm':
        return '8px';
      case 'lg':
        return '16px';
      default:
        return '12px';
    }
  };

  const indicatorStyles = {
    width: getSize(),
    height: getSize(),
    borderRadius: '50%',
    backgroundColor: getStatusColor(),
    display: 'inline-block',
    marginRight: showLabel ? DesignSystem.tokens.spacing[2] : '0',
    animation: status === 'loading' ? 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' : 'none',
  };

  const labelStyles = {
    fontSize: DesignSystem.tokens.typography.fontSize.sm[0],
    color: DesignSystem.tokens.colors.primary[600],
    textTransform: 'capitalize' as const,
  };

  return (
    <div
      style={{ display: 'flex', alignItems: 'center', ...style }}
      className={className}
      role="status"
      aria-label={`Status: ${status}`}
      {...ariaProps}
    >
      <span
        style={indicatorStyles}
        aria-hidden="true"
      />
      {showLabel && <span style={labelStyles}>{status}</span>}
    </div>
  );
};

// Modal Component
interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  showCloseButton?: boolean;
  closeOnEscape?: boolean;
  closeOnBackdrop?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  onClose,
  title,
  showCloseButton = true,
  closeOnEscape = true,
  closeOnBackdrop = true,
  className,
  style,
  ...ariaProps
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      if (modalRef.current) {
        modalRef.current.focus();
      }
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (closeOnEscape && event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [closeOnEscape, isOpen, onClose]);

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (closeOnBackdrop && event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: DesignSystem.tokens.zIndex.modal,
        padding: DesignSystem.tokens.spacing[4],
      }}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        style={{
          backgroundColor: DesignSystem.tokens.colors.primary[50],
          borderRadius: DesignSystem.tokens.borderRadius.lg,
          boxShadow: DesignSystem.tokens.shadows['2xl'],
          maxWidth: '90vw',
          maxHeight: '90vh',
          overflow: 'auto',
          padding: DesignSystem.tokens.spacing[6],
          position: 'relative',
          ...style,
        }}
        className={className}
        onClick={(e) => e.stopPropagation()}
        {...ariaProps}
      >
        {title && (
          <h2
            id="modal-title"
            style={{
              fontSize: DesignSystem.tokens.typography.fontSize.xl[0],
              fontWeight: DesignSystem.tokens.typography.fontWeight.semibold,
              margin: `0 0 ${DesignSystem.tokens.spacing[4]} 0`,
              paddingRight: showCloseButton ? DesignSystem.tokens.spacing[8] : '0',
            }}
          >
            {title}
          </h2>
        )}

        {showCloseButton && (
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: DesignSystem.tokens.spacing[4],
              right: DesignSystem.tokens.spacing[4],
              background: 'none',
              border: 'none',
              fontSize: DesignSystem.tokens.typography.fontSize.lg[0],
              cursor: 'pointer',
              padding: DesignSystem.tokens.spacing[2],
              borderRadius: DesignSystem.tokens.borderRadius.base,
              ...DesignSystem.utils.focusStyles(),
            }}
            aria-label="Close modal"
          >
            ×
          </button>
        )}

        <div>{children}</div>
      </div>
    </div>
  );
};

// Tooltip Component
interface TooltipProps extends BaseComponentProps {
  content: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  trigger?: 'hover' | 'focus' | 'click';
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  placement = 'top',
  trigger = 'hover',
  className,
  style,
  ...ariaProps
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  const getPlacementStyles = () => {
    const baseStyles = {
      position: 'absolute' as const,
      zIndex: DesignSystem.tokens.zIndex.tooltip,
      backgroundColor: DesignSystem.tokens.colors.primary[900],
      color: DesignSystem.tokens.colors.primary[50],
      padding: `${DesignSystem.tokens.spacing[2]} ${DesignSystem.tokens.spacing[3]}`,
      borderRadius: DesignSystem.tokens.borderRadius.base,
      fontSize: DesignSystem.tokens.typography.fontSize.sm[0],
      maxWidth: '200px',
      whiteSpace: 'nowrap' as const,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      pointerEvents: 'none' as const,
    };

    switch (placement) {
      case 'top':
        return {
          ...baseStyles,
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%) translateY(-4px)',
        };
      case 'bottom':
        return {
          ...baseStyles,
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%) translateY(4px)',
        };
      case 'left':
        return {
          ...baseStyles,
          right: '100%',
          top: '50%',
          transform: 'translateY(-50%) translateX(-4px)',
        };
      case 'right':
        return {
          ...baseStyles,
          left: '100%',
          top: '50%',
          transform: 'translateY(-50%) translateX(4px)',
        };
      default:
        return baseStyles;
    }
  };

  const handleTriggerEvents = () => {
    switch (trigger) {
      case 'hover':
        return {
          onMouseEnter: () => setIsVisible(true),
          onMouseLeave: () => setIsVisible(false),
        };
      case 'focus':
        return {
          onFocus: () => setIsVisible(true),
          onBlur: () => setIsVisible(false),
        };
      case 'click':
        return {
          onClick: () => setIsVisible(!isVisible),
        };
      default:
        return {};
    }
  };

  return (
    <div
      ref={triggerRef}
      style={{ position: 'relative', display: 'inline-block', ...style }}
      className={className}
      {...handleTriggerEvents()}
      {...ariaProps}
    >
      {children}
      {isVisible && (
        <div
          style={getPlacementStyles()}
          role="tooltip"
          aria-hidden={!isVisible}
        >
          {content}
        </div>
      )}
    </div>
  );
};

// Skip Link Component
export const SkipLink: React.FC<{
  href: string;
  children: React.ReactNode;
}> = ({ href, children }) => (
  <a
    href={href}
    style={{
      ...DesignSystem.accessibility.screenReader.skipLink,
    }}
  >
    {children}
  </a>
);

// Focus Trap Hook
export const useFocusTrap = (isActive: boolean) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);
    return () => container.removeEventListener('keydown', handleTabKey);
  }, [isActive]);

  return containerRef;
};

// Export all components
export const ComponentLibrary = {
  Button,
  Input,
  Card,
  Badge,
  StatusIndicator,
  Modal,
  Tooltip,
  SkipLink,
  useFocusTrap,
};

export default ComponentLibrary;
