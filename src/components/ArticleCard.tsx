import React from "react";

import moment from "moment";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";

interface ArticleCardProps {
  title: string;
  url: string;
  publishedDate?: string;
  description?: string;
  imageUrl?: string;
  publishedAt?: string;
  classNameHeader?: string;
  source?: string;
  separator?: boolean;
  small?: boolean;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  url,
  imageUrl,
  description,
  publishedAt,
  separator = true,
  classNameHeader,
  source,
  small,
}) => {
  if (small) {
    return (
      <a
        href={url}
        target="_blank"
        className="grid grid-cols-[1fr,7fr] items-center gap-4 rounded-xl bg-white p-4  md:flex-row lg:gap-6"
      >
        {imageUrl && (
          <div className="group relative  h-24 w-40 rounded-lg bg-gray-100  ">
            <img
              src={imageUrl}
              alt={title}
              loading="lazy"
              width={150}
              height={90}
              className="h-full w-full rounded-xl object-cover object-center "
            />
          </div>
        )}

        <div className="flex  justify-start items-start flex-col gap-2">
          <p className="text-sm   text-left font-semibold group-hover:underline group-focus:underline">
            {title}
          </p>

          <p className=" max-h-10 overflow-hidden text-clip text-sm text-gray-500 ">
            {description}
          </p>
          <p className="   text-sm text-gray-500 ">
            {moment(publishedAt).startOf("hour").fromNow()}
          </p>
        </div>
      </a>
    );
  }

  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <div className="flex flex-col overflow-hidden  font-sans">
        {imageUrl && <img src={imageUrl} alt={title} />}

        <div className="flex flex-col gap-y-3 py-1">
          <h2 className={cn("font-medium text-lg ", classNameHeader)}>
            {title}
          </h2>
          <p className="text-gray-700 text-sm ">{description}</p>
          <div className="flex justify-end items-center text-gray-600 text-sm">
            <span>{moment(publishedAt).startOf("hour").fromNow()}</span>
            {source && (
              <>
                <span className="mx-2">|</span>
                <span>{source}</span>
              </>
            )}
          </div>
        </div>
        {separator && <Separator />}
      </div>
    </a>
  );
};

export default ArticleCard;
