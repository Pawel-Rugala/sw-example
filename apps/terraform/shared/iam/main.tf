resource "aws_iam_role" "this" {
  name_prefix        = var.role_name
  description        = var.role_description
  assume_role_policy = var.trusted_entity
  tags               = var.tags
}

data "aws_iam_policy_document" "this" {
  override_policy_documents = var.policy_documents
}

resource "aws_iam_policy" "this" {
  name        = var.policy_name
  description = var.policy_description
  policy      = data.aws_iam_policy_document.this.json
}

resource "aws_iam_role_policy_attachment" "this" {
  role       = aws_iam_role.this.name
  policy_arn = aws_iam_policy.this.arn
}