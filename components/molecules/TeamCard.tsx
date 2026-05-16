import Image from "next/image";

interface TeamCardProps {
  name: string;
  role: string;
  image?: string;
  initials?: string;
}

export function TeamCard({ name, role, image, initials }: TeamCardProps) {
  const abbr = initials ?? name.split(" ").slice(0, 2).map((p) => p[0]).join("");

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:-translate-y-1.5 hover:shadow-md transition-all duration-200">
      <div className="aspect-square relative bg-gray-100 flex items-center justify-center font-head font-extrabold text-4xl text-primary/40">
        {image ? (
          <Image src={image} alt={name} fill className="object-cover" />
        ) : (
          abbr
        )}
      </div>
      <div className="p-5">
        <div className="font-head font-bold">{name}</div>
        <div className="text-sm text-[#4a5568] mt-0.5">{role}</div>
      </div>
    </div>
  );
}
