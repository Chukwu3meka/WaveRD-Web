import CategoriesIcon from "./CategoriesIcon";
import Ellipsis from "components/shared/ellipsis";

import { styles } from ".";
import { CATEGORIES } from "utils/constants";
import { CategoriesViewProps } from "interfaces/components/apihub.interface";
import { List, ListItemText, ListItemButton, Typography, ListItemIcon } from "@mui/material";

const CategoriesView = ({ showTopCategories, categories, displayHeader }: CategoriesViewProps) =>
  showTopCategories ? (
    <aside className={styles.categories} style={{ top: displayHeader ? "var(--headerHeight)" : "-10px" }}>
      <Typography pl={7} sx={{ width: "100%", maxWidth: 220 }}>
        Top Categories
      </Typography>

      {categories?.map(({ title, id, category }) => (
        <List key={id} component="nav" aria-labelledby="nested-list-subheader" sx={{ width: "100%", maxWidth: 220, mb: -2 }}>
          <ListItemButton>
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
