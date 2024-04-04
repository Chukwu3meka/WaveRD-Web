import CategoriesIcon from "./CategoriesIcon";

import { styles } from ".";
import { CATEGORIES } from "utils/constants";
import { CategoriesViewProps } from "interfaces/components/apihub.interface";
import { List, ListItemText, ListItemButton, Typography, ListItemIcon } from "@mui/material";

const CategoriesView = ({ showTopCategories, categories, displayHeader }: CategoriesViewProps) =>
  showTopCategories ? (
    <aside className={styles.categories} style={{ top: displayHeader ? "var(--headerHeight)" : "-10px" }}>
      <Typography pl={2} fontWeight={600}>
        Top Categories
      </Typography>

      {categories?.map(({ title, id, category }) => (
        <List key={id} component="nav" aria-labelledby="nested-list-subheader" sx={{ width: "100%", mb: -2 }}>
          <ListItemButton>
            <ListItemIcon>
              <CategoriesIcon icon={CATEGORIES[id]} color="primary" />
            </ListItemIcon>

            <ListItemText primary={title} sx={{ ml: -2 }} />
          </ListItemButton>
        </List>
      ))}
    </aside>
  ) : (
    <></>
  );

export default CategoriesView;
