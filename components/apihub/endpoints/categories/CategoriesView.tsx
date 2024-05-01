import CategoriesIcon from "./CategoriesIcon";
import Ellipsis from "components/shared/ellipsis";

import { styles } from ".";
import { CATEGORIES } from "utils/constants";
import { CategoriesViewProps } from "interfaces/components/apihub/endpoints.interface";
import { List, ListItemText, ListItemButton, Typography, ListItemIcon } from "@mui/material";

const CategoriesView = ({ showTopCategories, categories, displayHeader, switchCategory, selected }: CategoriesViewProps) =>
  showTopCategories ? (
    <aside className={styles.categories} style={{ top: displayHeader ? "var(--headerHeight)" : "-10px" }}>
      <Typography pl={7} sx={{ width: "100%", maxWidth: 220 }} fontSize=".8em">
        Top Categories
      </Typography>

      {categories?.map(({ title, id, category }) => (
        <List key={id} aria-label="categories-list" sx={{ width: "100%", maxWidth: 220, mb: -2 }}>
          <ListItemButton onClick={switchCategory(id)} selected={selected === id}>
            <ListItemIcon>
              <CategoriesIcon icon={CATEGORIES[id]} color="primary" />
            </ListItemIcon>

            <ListItemText sx={{ ml: -2 }}>
              <Ellipsis lines={1} fontWeight={600}>
                {title}
              </Ellipsis>
            </ListItemText>
          </ListItemButton>
        </List>
      ))}
    </aside>
  ) : (
    <></>
  );

export default CategoriesView;
