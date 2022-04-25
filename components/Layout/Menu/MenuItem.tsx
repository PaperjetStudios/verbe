import Link from "next/link";
import { createCategoryLink } from "../../../config/util";
import { MainMenuItemType } from "../../../data/settings/main-menu";

const MenuItem: React.FC<MainMenuItemType> = (item) => {
  const page = item.Page.data;
  const category = item.Category.data;
  const extraClass = item.Extra_Class;
  let slug = "";
  if (page) {
    slug = page.attributes.slug === "home" ? "/" : page.attributes.slug;
  } else {
    slug = createCategoryLink(category.attributes.slug);
  }

  return (
    <Link href={`${slug}`}>
      <a className={extraClass}>{`${item.Title}`}</a>
    </Link>
  );
};

export default MenuItem;
