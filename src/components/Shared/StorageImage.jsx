import React, { useEffect, useState } from "react";
import { ref as storageRef, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase-config";

/**
 * StorageImage
 * Props:
 * - path: string (storage path under your bucket, e.g. 'images/icon.png')
 * - alt: string
 * - className: string
 */
export default function StorageImage({ path, alt = "", className = "", fallbackSrc = "", ...rest }) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    let mounted = true;
    async function fetchUrl() {
      if (!path) return;
      try {
        const imageRef = storageRef(storage, path);
        const downloaded = await getDownloadURL(imageRef);
        if (mounted) setUrl(downloaded);
      } catch (err) {
        console.warn(`Failed to load storage image ${path}, using fallback if provided:`, err);
        if (mounted) setUrl(fallbackSrc || "");
      }
    }
    fetchUrl();
    return () => (mounted = false);
  }, [path, fallbackSrc]);

  return <img src={url} alt={alt} className={className} {...rest} />;
}
