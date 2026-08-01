import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import ScriptHero from "@/components/ScriptHero";
import ServiceIcon from "@/components/ServiceIcon";
import { Eyebrow } from "@/components/ui";
import { images, teamGroups, type TeamMember } from "@/lib/site";
import { getHeroRows } from "@/lib/hero";
import { getTeam, type PublicStaffMember } from "@/lib/team";
import { getPageCopy } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the therapists, beauty specialists and support team behind Maricel Beauty Center in Dubai.",
  alternates: { canonical: "/our-team" },
};

export const revalidate = 300;

/** Category tags a staff member can carry on the admin's Staff page, in the
 *  order their sections appear on this page. Mirrors the icons/labels the
 *  hardcoded fallback groups below already use, so a real roster looks the
 *  same as the placeholder one. */
const TEAM_CATEGORY_GROUPS = [
  { tag: "Therapist", label: "Therapists", icon: "lotus" },
  { tag: "Beauty Specialist", label: "Beauty Specialists", icon: "skin" },
  { tag: "Support Team", label: "Support Team", icon: "sparkle" },
  { tag: "Admin", label: "Administration", icon: "crown" },
];

function MemberCard({
  member,
}: {
  member: TeamMember | PublicStaffMember;
}) {
  return (
    <figure className="overflow-hidden rounded-xl border border-pink-100 bg-white shadow-[0_1px_3px_rgba(43,39,48,0.05)] transition-shadow duration-300 hover:shadow-[0_10px_28px_rgba(224,33,138,0.12)]">
      <div className="relative aspect-[4/5] overflow-hidden bg-blush-100">
        {member.image ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover"
            loading="lazy"
          />
        ) : (
          <span className="flex h-full items-center justify-center text-3xl font-display text-pink-300">
            {member.name.slice(0, 1).toUpperCase()}
          </span>
        )}
      </div>
      <figcaption className="px-3 py-3.5 text-center">
        <p className="text-sm font-semibold text-ink-900">{member.name}</p>
        <p className="mt-0.5 text-[11px] leading-snug text-ink-500 sm:text-xs">
          {member.role}
        </p>
      </figcaption>
    </figure>
  );
}

/** Label flanked by hairlines, with the group's icon in a pink bubble. */
function GroupHeading({ label, icon }: { label: string; icon: string }) {
  return (
    <div className="flex items-center gap-3 sm:gap-5">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-pink-200" />
      <span className="flex items-center gap-2 whitespace-nowrap">
        <span className="text-pink-400">
          <ServiceIcon name={icon} size={20} />
        </span>
        <span className="text-[11px] font-semibold tracking-[0.2em] text-pink-500 sm:text-xs">
          {label.toUpperCase()}
        </span>
      </span>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-pink-200" />
    </div>
  );
}

export default async function OurTeamPage() {
  const [[hero], dynamicTeam, c] = await Promise.all([
    getHeroRows("our-team"),
    getTeam(),
    getPageCopy("our-team"),
  ]);

  // Someone can carry more than one tag (e.g. nails + massage) and shows up
  // under every matching section. Anyone with no tags yet still needs a
  // home, so they land in one catch-all group rather than disappearing.
  const categorizedGroups = TEAM_CATEGORY_GROUPS.map((g) => ({
    ...g,
    members: dynamicTeam.filter((m) => m.categories.includes(g.tag)),
  })).filter((g) => g.members.length > 0);

  const uncategorized = dynamicTeam.filter((m) => m.categories.length === 0);
  const dynamicGroups =
    uncategorized.length > 0
      ? [...categorizedGroups, { tag: "Team", label: "Team", icon: "personal", members: uncategorized }]
      : categorizedGroups;

  return (
    <div>
      <ScriptHero
        scriptTop={hero?.eyebrow ?? "Meet Our"}
        title={hero?.title_lead ?? "Team"}
        body={
          hero?.body ??
          "A team of passionate professionals dedicated to bringing out your natural beauty and well-being."
        }
        image={hero?.image ?? images.teamSalon}
        imageAlt="The styling stations at Maricel Beauty Center"
      />

      <section className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14 lg:px-8">
        <div className="text-center">
          <Eyebrow className="!text-gold-400">
            {c("intro.eyebrow", "Beauty, Care, Passion")}
          </Eyebrow>
          <h2 className="mt-3 font-display text-2xl leading-tight text-ink-900 sm:text-3xl lg:text-4xl">
            {c("intro.title", "The Experts Behind Your Glow")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink-500 sm:text-base">
            {c(
              "intro.body",
              "Each member of our team is highly trained and committed to providing you with the best experience possible."
            )}
          </p>
        </div>

        <div className="mt-12 space-y-12 sm:mt-14 sm:space-y-14">
          {(dynamicTeam.length > 0 ? dynamicGroups : teamGroups).map((group) => (
            <div key={group.label}>
              <GroupHeading label={group.label} icon={group.icon} />

              {/* Centred so a short final row sits under the middle of the grid
                  rather than hugging the left edge. */}
              <div className="mt-7 flex flex-wrap justify-center gap-4 sm:gap-5">
                {group.members.map((member) => (
                  <div
                    key={member.name}
                    className="w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-0.875rem)] lg:w-[calc(20%-1rem)]"
                  >
                    <MemberCard member={member} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Closing band */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-pink-100 via-blush-100 to-pink-50 px-6 py-10 text-center sm:px-12 sm:py-12 sm:text-left">
          <div className="sm:flex sm:items-center sm:justify-between sm:gap-8">
            <div>
              <h2 className="font-display text-2xl text-pink-600 sm:text-3xl">
                {c("closing.title", "We're Here For You")}
              </h2>
              <p className="mt-2 text-sm text-ink-700 sm:text-base">
                {c(
                  "closing.body",
                  "Our team is ready to help you look and feel your best."
                )}
              </p>
            </div>

            <div className="mt-6 flex flex-col items-center gap-3 sm:mt-0 sm:shrink-0 sm:flex-row">
              {/* No booking system to send visitors to yet — static on purpose. */}
              <button
                type="button"
                className="w-full rounded-lg bg-pink-500 px-7 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-pink-600 sm:w-auto"
              >
                {c("closing.button1", "Book Appointment")}
              </button>
              <Link
                href="/careers"
                className="w-full rounded-lg border border-pink-400 px-7 py-3 text-center text-sm font-medium text-pink-500 transition-colors hover:bg-pink-500 hover:text-white sm:w-auto"
              >
                {c("closing.button2", "Join Our Team")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
