# Data

The data here is derived from [Zygmunt Zając](https://github.com/zygmuntz)'s
[goodbooks-10k](https://www.kaggle.com/zygmunt/goodbooks-10k) Kaggle dataset,
used under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

## Files

| file | description |
| --- | --- |
| books.json | Map of book IDs to book attributes |
| tags.json | Map of tag names to books with tag |
| user_network_100.json | Nodes and edges for user-based book network (limited to top 100 books) |
| user_network_500.json | Nodes and edges for user-based book network (limited to top 500 books) |
| user_network_1000.json | Nodes and edges for user-based book network (limited to top 1k books) |
| user_network_5000.json | Nodes and edges for user-based book network (limited to top 5k books) |
| user_network_full.json | Nodes and edges for the full user-based book network (10k books) |
| tag_network_100.json | Nodes and edges for tag-based book network (limited to top 100 books) |
| tag_network_500.json | Nodes and edges for tag-based book network (limited to top 500 books) |
| tag_network_1000.json | Nodes and edges for tag-based book network (limited to top 1k books) |
| tag_network_5000.json | Nodes and edges for tag-based book network (limited to top 5k books) |
| tag_network_full.json | Nodes and edges for the full tag-based book network (10k books) |

### A note on networks
In the **user-based** network, books are nodes and edges exist between nodes if a user has rated both books. Edges can be _weighted_ or _filtered_. For example, if 100 readers rated both `Animal Farm` and `1984`, we'd draw an edge between those two nodes with a weight of 100. This allows us to filter out edges that might not be relevant. If only 2 readers rated, say, both `Catcher in the Rye` and `Being and Time`, and we filtered out edges with a weight of 2, we'd be excluding that rather improbable connection. The **tag-based networks** do the same thing, except edges exist between two books if they share at least one tag, like `dystopian-fiction` or `could-not-finish`.

