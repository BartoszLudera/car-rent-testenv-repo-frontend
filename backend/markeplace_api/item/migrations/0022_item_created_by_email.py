# Generated by Django 5.0.4 on 2024-06-14 22:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('item', '0021_item_offert_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='created_by_email',
            field=models.CharField(default=1, max_length=255),
        ),
    ]
