# Generated by Django 5.0.4 on 2024-06-13 13:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('item', '0020_item_is_active'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='offert_type',
            field=models.CharField(default=1, max_length=255),
        ),
    ]
