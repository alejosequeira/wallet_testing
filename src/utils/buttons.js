export const handleCopyAccountClick = async (Result,setIsCopied) => {
    if (!navigator.clipboard) {
      console.error('Clipboard API not available.');
      return;
    }

    try {
      await navigator.clipboard.writeText(Result);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };