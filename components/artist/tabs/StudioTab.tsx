"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

import { ShareButton } from "@/components/artist/ShareButton";
import type { Artist, ArtistProfile, StudioPost } from "@/lib/data";
import {
  getArtistExclusiveContent,
  getArtistStudioPosts,
} from "@/lib/data";

type StudioTabProps = {
  artist: Artist;
  profile: ArtistProfile | undefined;
  portrait: string | undefined;
};

function sortPostsNewestFirst(posts: StudioPost[]): StudioPost[] {
  return [...posts].sort(
    (a, b) => Date.parse(b.date) - Date.parse(a.date),
  );
}

function PlayTri({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M8 5v14l11-7-11-7z" fill="currentColor" />
    </svg>
  );
}

function FeedPost({
  post,
  artistName,
  index,
}: {
  post: StudioPost;
  artistName: string;
  index: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.12 });
  const [hovered, setHovered] = useState(false);

  const dateRow = (
    <div
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "9px",
        color: "var(--sub)",
        marginBottom: "8px",
      }}
    >
      {post.date}
    </div>
  );

  return (
    <div ref={ref}>
      <motion.article
        initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={
          reduce
            ? { duration: 0 }
            : {
                type: "spring",
                stiffness: 100,
                damping: 16,
                delay: index * 0.05,
              }
        }
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "relative",
          padding: "20px 40px 20px 0",
          borderBottom: "0.5px solid var(--border)",
        }}
      >
      <div
        style={{
          position: "absolute",
          right: 0,
          top: "20px",
          opacity: hovered ? 1 : 0,
          transition: "opacity 150ms var(--ease)",
        }}
      >
        <ShareButton size="icon" artistName={artistName} />
      </div>

      {post.type === "text" && post.body ? (
        <>
          {dateRow}
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-body)",
              fontSize: "16px",
              fontWeight: 300,
              lineHeight: 1.7,
              color: hovered ? "rgba(242,237,232,0.98)" : "var(--white)",
              transition: "color 200ms var(--ease)",
            }}
          >
            {post.body}
          </p>
        </>
      ) : null}

      {post.type === "image" && post.image ? (
        <>
          {dateRow}
          <motion.div
            whileHover={
              reduce ? undefined : { scale: 1.01 }
            }
            transition={
              reduce
                ? { duration: 0 }
                : { type: "spring", stiffness: 200, damping: 20 }
            }
            style={{
              width: "100%",
              borderRadius: "2px",
              overflow: "hidden",
              position: "relative",
              aspectRatio: "4 / 3",
            }}
          >
            <Image
              src={post.image}
              alt=""
              fill
              sizes="680px"
              style={{ objectFit: "cover" }}
            />
          </motion.div>
          {post.caption ? (
            <p
              style={{
                margin: "10px 0 0",
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                fontWeight: 300,
                color: "var(--muted)",
                fontStyle: "italic",
              }}
            >
              {post.caption}
            </p>
          ) : null}
        </>
      ) : null}

      {post.type === "quote" && post.body ? (
        <div style={{ padding: "28px 0" }}>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "80px",
              fontWeight: 800,
              color: "var(--orange)",
              lineHeight: 0.6,
              display: "block",
              marginBottom: "-8px",
              opacity: 0.4,
            }}
            aria-hidden
          >
            &ldquo;
          </span>
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-body)",
              fontSize: "20px",
              fontWeight: 300,
              fontStyle: "italic",
              color: "var(--white)",
              lineHeight: 1.55,
            }}
          >
            {post.body}
          </p>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              color: "var(--sub)",
              marginTop: "12px",
            }}
          >
            {post.date}
          </div>
        </div>
      ) : null}

      {(post.type === "clip" || post.type === "video") &&
      (post.image || post.videoFile) ? (
        <>
          {dateRow}
          <div
            style={{
              position: "relative",
              borderRadius: "2px",
              overflow: "hidden",
              aspectRatio: "16 / 9",
            }}
          >
            {post.image ? (
              <Image
                src={post.image}
                alt=""
                fill
                sizes="680px"
                style={{ objectFit: "cover" }}
              />
            ) : null}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(12,11,10,0.35)",
              }}
            />
            <motion.div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--white)",
              }}
              whileHover={reduce ? undefined : { scale: 1.08 }}
              transition={
                reduce
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 300, damping: 20 }
              }
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: "rgba(224,92,32,0.85)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: "4px",
                }}
              >
                <PlayTri size={18} />
              </div>
            </motion.div>
            <div
              style={{
                position: "absolute",
                bottom: "8px",
                right: "8px",
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                color: "var(--white)",
                background: "rgba(12,11,10,0.7)",
                padding: "2px 6px",
                borderRadius: "2px",
              }}
            >
              Clip
            </div>
          </div>
          {post.caption ? (
            <p
              style={{
                margin: "10px 0 0",
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                fontWeight: 300,
                color: "var(--muted)",
                fontStyle: "italic",
              }}
            >
              {post.caption}
            </p>
          ) : null}
        </>
      ) : null}
      </motion.article>
    </div>
  );
}

export function StudioTab({ artist, profile, portrait }: StudioTabProps) {
  const reduce = useReducedMotion();
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const gatefoldRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const posts = useMemo(
    () => sortPostsNewestFirst(getArtistStudioPosts(artist.slug)),
    [artist.slug],
  );
  const vaultCount = useMemo(
    () => getArtistExclusiveContent(artist.slug).length,
    [artist.slug],
  );

  const firstName = artist.name.split(/\s+/)[0] ?? artist.name;
  const gallery = profile?.galleryImages?.slice(0, 3) ?? [];

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowStickyBar(false);
        } else if (entry.boundingClientRect.top < 0) {
          setShowStickyBar(true);
          setHasScrolled(true);
        }
      },
      { threshold: [0, 0.01, 0.1] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  function scrollToGatefold() {
    const top = gatefoldRef.current?.offsetTop;
    if (top == null) return;
    window.scrollTo({ top, behavior: "smooth" });
  }

  return (
    <div style={{ background: "var(--black)" }}>
      <div
        ref={gatefoldRef}
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          background: "var(--black)",
        }}
      >
        {portrait ? (
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.06,
              pointerEvents: "none",
              zIndex: 0,
            }}
          >
            <Image
              src={portrait}
              alt=""
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        ) : null}
        <div
          style={{
            flex: 1,
            display: "flex",
            gap: "4%",
            padding: "56px 48px",
            boxSizing: "border-box",
            position: "relative",
            zIndex: 1,
          }}
        >
                  <div style={{ width: "52%", flexShrink: 0 }}>
                    <h2
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "48px",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        color: "var(--white)",
                        lineHeight: 0.9,
                        margin: "0 0 4px",
                      }}
                    >
                      {artist.name}
                    </h2>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "11px",
                        textTransform: "uppercase",
                        color: "var(--orange)",
                        marginBottom: "32px",
                      }}
                    >
                      {artist.genre} · {artist.city}
                    </div>

                    {profile?.pinnedNote ? (
                      <div style={{ marginBottom: "32px" }}>
                        <div
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "9px",
                            textTransform: "uppercase",
                            letterSpacing: "0.12em",
                            color: "var(--orange)",
                            marginBottom: "10px",
                          }}
                        >
                          A note from the artist
                        </div>
                        <div
                          style={{
                            background: "var(--surface)",
                            borderLeft: "2px solid var(--orange)",
                            borderRadius: "0 2px 2px 0",
                            padding: "20px 24px",
                          }}
                        >
                          <p
                            style={{
                              margin: 0,
                              fontFamily: "var(--font-body)",
                              fontSize: "15px",
                              fontWeight: 300,
                              color: "var(--white)",
                              lineHeight: 1.7,
                              fontStyle: "italic",
                            }}
                          >
                            {profile.pinnedNote}
                          </p>
                        </div>
                      </div>
                    ) : null}

                    {profile?.longBio ? (
                      <p
                        style={{
                          margin: "24px 0 0",
                          fontFamily: "var(--font-body)",
                          fontSize: "14px",
                          fontWeight: 300,
                          color: "var(--muted)",
                          lineHeight: 1.8,
                        }}
                      >
                        {profile.longBio}
                      </p>
                    ) : null}
                  </div>

                  <div style={{ width: "44%", flexShrink: 0 }}>
                    {gallery.map((src, i) => {
                      const layouts = [
                        { width: "100%", aspectRatio: "4 / 5", marginLeft: "0%" },
                        { width: "80%", aspectRatio: "1", marginLeft: "20%" },
                        { width: "70%", aspectRatio: "16 / 9", marginLeft: "0%" },
                      ];
                      const L = layouts[i] ?? layouts[2]!;
                      return (
                        <motion.div
                          key={src}
                          whileHover={
                            reduce ? undefined : { scale: 1.02 }
                          }
                          transition={
                            reduce
                              ? { duration: 0 }
                              : { type: "spring", stiffness: 200, damping: 20 }
                          }
                          style={{
                            position: "relative",
                            width: L.width,
                            marginLeft: L.marginLeft,
                            aspectRatio: L.aspectRatio,
                            borderRadius: "2px",
                            overflow: "hidden",
                            marginBottom: "12px",
                          }}
                        >
                          <Image
                            src={src}
                            alt=""
                            fill
                            sizes="400px"
                            style={{ objectFit: "cover" }}
                          />
                        </motion.div>
                      );
                    })}

                    {profile?.pullQuote ? (
                      <div style={{ marginTop: "32px" }}>
                        <p
                          style={{
                            margin: 0,
                            fontFamily: "var(--font-body)",
                            fontSize: "18px",
                            fontWeight: 300,
                            fontStyle: "italic",
                            color: "var(--white)",
                            lineHeight: 1.5,
                          }}
                        >
                          <span
                            style={{
                              color: "var(--orange)",
                              fontSize: "48px",
                              lineHeight: 0,
                              fontFamily: "var(--font-display)",
                              fontWeight: 800,
                              marginRight: "4px",
                              verticalAlign: "text-top",
                            }}
                            aria-hidden
                          >
                            &ldquo;
                          </span>
                          {profile.pullQuote}
                        </p>
                        {profile.pullQuoteContext ? (
                          <div
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: "10px",
                              textTransform: "uppercase",
                              color: "var(--sub)",
                              marginTop: "8px",
                            }}
                          >
                            {profile.pullQuoteContext}
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
        </div>

        <AnimatePresence>
          {!hasScrolled ? (
            <motion.div
              key="scroll-hint"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{
                position: "absolute",
                bottom: "24px",
                left: "50%",
                transform: "translateX(-50%)",
                textAlign: "center",
                zIndex: 2,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "9px",
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  color: "var(--sub)",
                }}
              >
                Scroll to enter
              </div>
              <motion.div
                animate={reduce ? { y: 0 } : { y: [0, 6, 0] }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                }
                style={{
                  marginTop: "8px",
                  color: "var(--sub)",
                  fontSize: "12px",
                }}
              >
                ▾
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div
          ref={sentinelRef}
          style={{
            height: "1px",
            width: "100%",
            pointerEvents: "none",
            flexShrink: 0,
          }}
          aria-hidden
        />
      </div>

      <section
        aria-label={`Studio feed: ${posts.length} posts, ${vaultCount} exclusives`}
        style={{
          position: "relative",
          zIndex: 2,
          background: "var(--black)",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            position: "sticky",
            top: "52px",
            zIndex: 10,
            height: 0,
            width: "100%",
          }}
        >
          <AnimatePresence>
            {showStickyBar ? (
              <motion.button
                key="studio-sticky-bar"
                type="button"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 300, damping: 24 }
                }
                onClick={scrollToGatefold}
                whileHover={
                  reduce ? undefined : { backgroundColor: "var(--surface-2)" }
                }
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: 0,
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0 48px",
                  background: "var(--surface)",
                  border: "none",
                  borderBottom: "0.5px solid var(--border)",
                  cursor: "pointer",
                  boxSizing: "border-box",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "13px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      color: "var(--white)",
                    }}
                  >
                    {artist.name}
                  </span>
                  <span style={{ color: "var(--sub)" }}>·</span>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "12px",
                      fontWeight: 300,
                      color: "var(--muted)",
                    }}
                  >
                    Bio & photos
                  </span>
                </span>
                <span style={{ color: "var(--muted)", fontSize: "12px" }}>▾</span>
              </motion.button>
            ) : null}
          </AnimatePresence>
        </div>

        <div
          style={{
            padding: "0 48px",
            height: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "0.5px solid var(--border)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "13px",
              fontWeight: 700,
              textTransform: "uppercase",
              color: "var(--white)",
            }}
          >
            From {firstName}
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              color: "var(--sub)",
            }}
          >
            {posts.length} posts
          </span>
        </div>

        <div
          style={{
            padding: "24px 48px 64px",
            maxWidth: "680px",
            margin: "0 auto",
          }}
        >
          <AnimatePresence mode="popLayout">
            {posts.map((post, index) => (
              <FeedPost
                key={post.id}
                post={post}
                artistName={artist.name}
                index={index}
              />
            ))}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
